//@ts-check
class InstructionsBuilder {
  table = {};

  register(name) {
    this.table[name] = name;
    return this;
  }

  getInstructions() {
    return this.table;
  }
}

export const instructions = new InstructionsBuilder()
  .register("push")
  .register("add")
  .register("sub")
  .register("mul")
  .register("eq")
  .register("neq")
  .register("gt")
  .register("gte")
  .register("lt")
  .register("lte")
  .getInstructions();
