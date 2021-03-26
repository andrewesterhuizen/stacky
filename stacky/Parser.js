// @ts-check
import { instructions, instructionWidths } from "./instructions.js";
import { opcodes } from "./opcodes.js";
import { tokenType } from "./token.js";

export default class Parser {
  index = 0;
  tokens = [];
  output = [];
  labels = {};

  nextToken() {
    return this.tokens[++this.index];
  }

  peekNextToken() {
    return this.tokens[this.index + 1];
  }

  getLabels() {
    let currentInstruction = 0;
    let t = this.tokens[this.index];

    while (t) {
      switch (t.type) {
        case tokenType.label: {
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

  parseInstruction() {
    let t = this.tokens[this.index];

    switch (t.value) {
      case instructions.push: {
        const nextToken = this.peekNextToken();
        switch (nextToken.type) {
          case tokenType.integerLiteral:
            this.output.push(opcodes.push_literal);
            break;
          case tokenType.variable:
            this.output.push(opcodes.push_memory);
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

  getAndCheckInt(v) {
    const n = parseInt(v);
    if (n.toString() === "NaN") {
      throw `Parser: invalid number: ${v}`;
    }
    return n;
  }

  parse(tokens) {
    this.tokens = tokens;
    this.getLabels();

    let t = this.tokens[this.index];

    while (t) {
      switch (t.type) {
        case tokenType.instruction: {
          this.parseInstruction();
          break;
        }
        case tokenType.integerLiteral:
          this.output.push(this.getAndCheckInt(t.value));
          break;
        case tokenType.variable:
          this.output.push(this.getAndCheckInt(t.value));
          break;
      }
      t = this.nextToken();
    }

    return this.output;
  }
}
