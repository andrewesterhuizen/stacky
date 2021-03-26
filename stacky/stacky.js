//@ts-check
import Compiler from "./Compiler.js";
import VM from "./VM.js";

export const compile = (source) => {
  const bytecode = new Compiler().compile(source);
  return (...vars) => new VM().run(bytecode, vars);
};
