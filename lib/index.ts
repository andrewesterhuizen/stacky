import Assembler from "./Assembler";
import VM from "./VM";

export const compile = (source: string) => {
  const { instructions, entryPoint } = new Assembler().compile(source);
  return (...vars: number[]) => new VM().run(instructions, entryPoint, vars);
};

export const run = (source: string, ...vars: number[]) => compile(source)(...vars);
