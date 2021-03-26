// @ts-check
import { opcodes } from "./opcodes.js";

const bit = (v) => (v ? 1 : 0);

export default class VM {
  ip = 0;
  instructions = [];
  variables = [];
  sp = 0;
  stack = [];

  init(instructions, variables) {
    this.ip = 0;
    this.instructions = instructions;
    this.variables = variables;
    this.sp = 0;
    this.stack = [];
  }

  push(item) {
    this.sp++;
    this.stack.push(item);
  }

  pop() {
    this.sp--;
    return this.stack.pop();
  }

  fetch() {
    const i = this.instructions[this.ip];
    this.ip++;
    return i;
  }

  execute(instruction) {
    switch (instruction) {
      case opcodes.push_memory:
        const index = this.fetch();
        const value = this.variables[index];
        if (value === undefined) {
          throw `VM: no variable defined at index ${index}`;
        }

        this.push(value);
        break;

      case opcodes.push_literal:
        this.push(this.fetch());
        break;

      case opcodes.add: {
        const a = this.pop();
        const b = this.pop();
        this.push(b + a);
        break;
      }

      case opcodes.sub: {
        const a = this.pop();
        const b = this.pop();
        this.push(b - a);
        break;
      }

      case opcodes.mul: {
        const a = this.pop();
        const b = this.pop();
        this.push(b * a);
        break;
      }

      case opcodes.div: {
        const a = this.pop();
        const b = this.pop();
        this.push(Math.floor(b / a));
        break;
      }

      case opcodes.eq: {
        const a = this.pop();
        const b = this.pop();
        this.push(bit(b === a));
        break;
      }

      case opcodes.neq: {
        const a = this.pop();
        const b = this.pop();
        this.push(bit(b !== a));
        break;
      }

      case opcodes.gt: {
        const a = this.pop();
        const b = this.pop();
        this.push(bit(b > a));
        break;
      }

      case opcodes.gte: {
        const a = this.pop();
        const b = this.pop();
        this.push(bit(b >= a));
        break;
      }

      case opcodes.lt: {
        const a = this.pop();
        const b = this.pop();
        this.push(bit(b < a));
        break;
      }

      case opcodes.lte: {
        const a = this.pop();
        const b = this.pop();
        this.push(bit(b <= a));
        break;
      }

      default:
        throw `VM: unknown instruction ${instruction}`;
    }
  }

  run(instructions, variables) {
    this.init(instructions, variables);

    while (this.ip < this.instructions.length) {
      this.execute(this.fetch());
    }

    return this.stack[this.sp - 1];
  }
}
