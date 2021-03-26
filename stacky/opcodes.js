//@ts-check
class OpcodeTableBuilder {
  table = {};
  lastOpcode = 1;

  register(name) {
    this.table[name] = this.lastOpcode;
    this.lastOpcode++;
    return this;
  }

  getTable() {
    return this.table;
  }
}

export const opcodes = new OpcodeTableBuilder()
  .register("push_literal")
  .register("push_memory")
  .register("add")
  .register("sub")
  .register("mul")
  .register("div")
  .register("eq")
  .register("neq")
  .register("gt")
  .register("gte")
  .register("lt")
  .register("lte")
  .getTable();
