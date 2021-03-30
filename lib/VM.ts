import { opcodeNameLookup, opcodes } from "./opcodes";
import { bit } from "./utils";

export default class VM {
  private ip = 0;
  private instructions: number[] = [];
  private arguments: number[] = [];
  private sp = 0;
  private stack: number[] = [];
  private callStack: number[] = [];
  private debug = false;

  private log(...args: unknown[]) {
    if (this.debug) {
      console.log("VM:", ...args);
    }
  }

  private init(instructions: number[], entryPoint: number, args: number[]) {
    this.ip = entryPoint;
    this.instructions = instructions;
    this.arguments = args;
    this.sp = 0;
    this.stack = [];
  }

  private push(item: number) {
    this.sp++;
    this.stack.push(item);
  }

  private pop() {
    this.sp--;
    return this.stack.pop();
  }

  private fetch() {
    const i = this.instructions[this.ip];
    this.ip++;
    return i;
  }

  private execute(instruction: number) {
    this.log("executing:", opcodeNameLookup[instruction]);

    switch (instruction) {
      case opcodes.push_argument:
        const index = this.fetch();
        const value = this.arguments[index];
        if (value === undefined) {
          throw `VM: no argument defined at index ${index}`;
        }

        this.push(value);
        break;

      case opcodes.push_literal:
        this.push(this.fetch());
        break;

      case opcodes.pop:
        this.pop();
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

  run(instructions: number[], entryPoint: number, args: number[]) {
    this.init(instructions, entryPoint, args);

    while (this.ip < this.instructions.length) {
      this.execute(this.fetch());
    }

    return this.stack[this.sp - 1];
  }
}
