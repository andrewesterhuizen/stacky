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

  getTextToken() {
    const text = this.getTextUntilWhiteSpace();

    // label
    if (text.endsWith(":")) {
      this.tokens.push(new Token(tokenType.label, text.split(":")[0]));
      return;
    }

    if (!(text in instructions)) {
      throw `Lexer: unknown instruction ${text}`;
    }

    this.tokens.push(new Token(tokenType.instruction, text));
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
      // skip space
      if (c === " ") {
        continue;
      }

      if (/[a-zA-Z]/.test(c)) {
        this.getTextToken();
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
