//@ts-check
export const tokenType = {
  instruction: "INSTRUCTION",
  variable: "VARIABLE",
  integerLiteral: "INTEGER_LITERAL",
};

export class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}
