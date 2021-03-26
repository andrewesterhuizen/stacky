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
      const label = text.split(":")[0];
      this.tokens.push(new Token(tokenType.labelDefinition, label));
      return;
    }

    if (text in instructions) {
      this.tokens.push(new Token(tokenType.instruction, text));
    } else {
      this.tokens.push(new Token(tokenType.label, text));
    }
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

    let c = this.source[this.index];

    while (c) {
      // skip space
      if (c === " " || c === "\n") {
        c = this.nextChar();
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
