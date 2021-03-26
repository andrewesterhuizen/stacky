//@ts-check
import { instructions } from "./instructions.js";
import { Token, tokenType } from "./token.js";

export default class Lexer {
  index = 0;
  source = "";
  tokens = [];

  nextChar() {
    return this.source[++this.index];
  }

  getTextUntilWhiteSpace() {
    let c = this.source[this.index];
    let text = "";

    while (c && c !== " " && c !== "\n") {
      text += c;
      c = this.nextChar();
    }

    return text;
  }

  getInstructionToken() {
    let instruction = this.getTextUntilWhiteSpace();

    if (!(instruction in instructions)) {
      throw `Lexer: unknown instruction ${instruction}`;
    }

    this.tokens.push(new Token(tokenType.instruction, instruction));
  }

  getIntegerLiteralToken() {
    const n = this.getTextUntilWhiteSpace();
    this.tokens.push(new Token(tokenType.integerLiteral, n));
  }

  getVariableToken() {
    this.nextChar(); // skip '$'
    const n = this.getTextUntilWhiteSpace();
    this.tokens.push(new Token(tokenType.variable, n));
  }

  getTokens(source) {
    this.index = 0;
    this.source = source.trim();
    this.output = [];

    let c = this.source[this.index];

    while (c && c !== " " && c !== "\n") {
      if (/[a-zA-Z]/.test(c)) {
        this.getInstructionToken();
      } else if (c === " ") {
        // skip
      } else if (c === "$") {
        this.getVariableToken();
      } else {
        this.getIntegerLiteralToken();
      }

      c = this.nextChar();
    }

    return this.tokens;
  }
}
