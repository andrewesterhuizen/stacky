import { instructions } from "./instructions";
import { Token, tokenType } from "./token";

export default class Lexer {
  private tokens: Token[] = [];
  private index = 0;
  private source = "";

  private nextChar() {
    return this.source[++this.index];
  }

  private getTextUntilWhiteSpace() {
    let c = this.source[this.index];
    let text = "";

    while (c && c !== " " && c !== "\n") {
      text += c;
      c = this.nextChar();
    }

    return text;
  }

  private skipRestOfLine() {
    let c = this.source[this.index];
    while (c && c !== "\n") {
      c = this.nextChar();
    }
  }

  private getTextToken() {
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

  private getIntegerLiteralToken() {
    const n = this.getTextUntilWhiteSpace();
    this.tokens.push(new Token(tokenType.integerLiteral, n));
  }

  private getVariableToken() {
    this.nextChar(); // skip '$'
    const n = this.getTextUntilWhiteSpace();
    this.tokens.push(new Token(tokenType.variable, n));
  }

  getTokens(source: string) {
    this.index = 0;
    this.source = source.trim();

    let c = this.source[this.index];

    while (c) {
      // skip space
      if (c === " " || c === "\n") {
        c = this.nextChar();
        continue;
      }

      if (c == ";") {
        this.skipRestOfLine();
      } else if (/[a-zA-Z]/.test(c)) {
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
