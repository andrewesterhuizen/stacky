//@ts-check

class InstructionsBuilder {
  widths = {};
  table = {};

  register(name, nOperands = 0) {
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

const builder = new InstructionsBuilder()
  .register("push", 1)
  .register("add")
  .register("sub")
  .register("mul")
  .register("eq")
  .register("neq")
  .register("gt")
  .register("gte")
  .register("lt")
  .register("lte");

export const instructions = builder.getInstructionsTable();
export const instructionWidths = builder.getInstructionWidthsTable();
