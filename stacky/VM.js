// @ts-check
import { opcodeNameLookup, opcodes } from "./opcodes.js";

const bit = (v) => (v ? 1 : 0);

export default class VM {
  ip = 0;
  instructions = [];
  variables = [];
  sp = 0;
  stack = [];
  callStack = [];

  debug = false;

  log(...args) {
    if (this.debug) {
      console.log("VM:", ...args);
    }
  }

  init(instructions, entryPoint, variables) {
    this.ip = entryPoint;
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
    this.log("executing:", opcodeNameLookup[instruction]);

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

      case opcodes.call:
        // push return address
        this.callStack.push(this.ip + 1);
        this.ip = this.fetch();
        break;

      case opcodes.ret:
        this.ip = this.callStack.pop();
        break;

      case opcodes.jump: {
        this.ip = this.fetch();
        break;
      }

      case opcodes.jumpz: {
        const address = this.fetch();
        const val = this.pop();
        if (val === 0) {
          this.ip = address;
        }
        break;
      }

      case opcodes.jumpnz: {
        const address = this.fetch();
        const val = this.pop();
        if (val !== 0) {
          this.ip = address;
        }
        break;
      }

      case opcodes.dup: {
        const val = this.stack[this.sp - 1];
        this.push(val);
        break;
      }

      case opcodes.swap: {
        const a = this.pop();
        const b = this.pop();
        this.push(a);
        this.push(b);
        break;
      }

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

  run(instructions, entryPoint, variables) {
    this.init(instructions, entryPoint, variables);

    while (this.ip < this.instructions.length) {
      this.execute(this.fetch());
    }

    return this.stack[this.sp - 1];
  }
}
