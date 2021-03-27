//@ts-check
import Compiler from "./Compiler.js";
import VM from "./VM.js";

export const compile = (source) => {
  const { instructions, entryPoint } = new Compiler().compile(source);
  return (...vars) => new VM().run(instructions, entryPoint, vars);
};
