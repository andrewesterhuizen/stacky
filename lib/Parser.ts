import { instructions, instructionWidths } from "./instructions";
import { opcodes } from "./opcodes";
import { Token, tokenType } from "./token";

export default class Parser {
  private index = 0;
  private tokens: Token[] = [];
  private output: number[] = [];
  private labels: Record<string, number> = {};

  private nextToken() {
    return this.tokens[++this.index];
  }

  private peekNextToken() {
    return this.tokens[this.index + 1];
  }

  private getLabels() {
    let currentInstruction = 0;
    let t = this.tokens[this.index];

    while (t) {
      switch (t.type) {
        case tokenType.labelDefinition: {
          this.labels[t.value] = currentInstruction;
          break;
        }
        case tokenType.instruction: {
          currentInstruction += instructionWidths[t.value];
          break;
        }
      }
      t = this.nextToken();
    }

    // reset token index
    this.index = 0;
  }

  private parseInstruction() {
    let t = this.tokens[this.index];

    switch (t.value) {
      case instructions.push: {
        const nextToken = this.peekNextToken();
        switch (nextToken.type) {
          case tokenType.integerLiteral:
            this.output.push(opcodes.push_literal);
            break;
          case tokenType.argument:
            this.output.push(opcodes.push_argument);
            break;
          default:
            throw `Parser: unexpected token ${nextToken.value}`;
        }
        break;
      }

      default:
        // case where instruction maps to opcode
        if (!(t.value in instructions)) {
          throw `Parser: unknown instruction ${t.value}`;
        }

        if (!(t.value in opcodes)) {
          throw `Parser: instruction ${t.value} does not have matching opcode`;
        }

        this.output.push(opcodes[t.value]);
    }
  }

  private getAndCheckInt(v: string) {
    const n = parseInt(v);
    if (n.toString() === "NaN") {
      throw `Parser: invalid number: ${v}`;
    }
    return n;
  }

  parse(tokens: Token[]) {
    this.tokens = tokens;
    this.getLabels();

    let t = this.tokens[this.index];

    while (t) {
      switch (t.type) {
        case tokenType.instruction: {
          this.parseInstruction();
          break;
        }
        case tokenType.label:
          if (!(t.value in this.labels)) {
            throw `Parser: no definition found for label ${t.value}`;
          }
          const address = this.labels[t.value];
          this.output.push(address);
          break;
        case tokenType.integerLiteral:
          this.output.push(this.getAndCheckInt(t.value));
          break;
        case tokenType.argument:
          this.output.push(this.getAndCheckInt(t.value));
          break;
      }
      t = this.nextToken();
    }

    return { instructions: this.output, entryPoint: this.labels["start"] || 0 };
  }
}
