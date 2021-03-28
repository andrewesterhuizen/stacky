import Compiler from "./Compiler";
import VM from "./VM";

export const compile = (source: string) => {
  const { instructions, entryPoint } = new Compiler().compile(source);
  return (...vars: number[]) => new VM().run(instructions, entryPoint, vars);
};

export const run = (source: string, ...vars: number[]) => compile(source)(...vars);
