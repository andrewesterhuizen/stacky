export const tokenType = {
  labelDefinition: "LABEL_DEFINITION",
  label: "LABEL",
  instruction: "INSTRUCTION",
  argument: "ARGUMENT",
  integerLiteral: "INTEGER_LITERAL",
};

export class Token {
  type: string;
  value: string;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }
}
