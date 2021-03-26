//@ts-check
export const tokenType = {
  label: "LABEL",
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
