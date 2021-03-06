class InstructionsBuilder {
  widths: Record<string, number> = {};
  table: Record<string, string> = {};

  register(name: string, nOperands: number = 0) {
    this.widths[name] = 1 + nOperands;
    this.table[name] = name;
    return this;
  }

  getInstructionsTable() {
    return this.table;
  }

  getInstructionWidthsTable() {
    return this.widths;
  }
}

const builder = new InstructionsBuilder();

builder
  .register("push", 1)
  .register("pop")
  .register("call", 1)
  .register("ret")
  .register("jump", 1)
  .register("jumpz", 1)
  .register("jumpnz", 1)
  .register("swap")
  .register("dup")
  .register("add")
  .register("sub")
  .register("mul")
  .register("div")
  .register("eq")
  .register("neq")
  .register("gt")
  .register("gte")
  .register("lt")
  .register("lte");

export const instructions = builder.getInstructionsTable();
export const instructionWidths = builder.getInstructionWidthsTable();
