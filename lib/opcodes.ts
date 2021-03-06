class OpcodeTableBuilder {
  table: Record<string, number> = {};
  nameLookup: Record<string, string> = {};
  lastOpcode = 1;

  register(name: string) {
    this.table[name] = this.lastOpcode;
    this.nameLookup[this.lastOpcode] = name;
    this.lastOpcode++;
    return this;
  }

  getTable() {
    return this.table;
  }

  getNameLookup() {
    return this.nameLookup;
  }
}

const builder = new OpcodeTableBuilder();

builder
  .register("push_literal")
  .register("push_argument")
  .register("pop")
  .register("call")
  .register("ret")
  .register("jump")
  .register("jumpz")
  .register("jumpnz")
  .register("dup")
  .register("swap")
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

export const opcodes = builder.getTable();
export const opcodeNameLookup = builder.getNameLookup();
