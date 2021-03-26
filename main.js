import { compile } from "./stacky/stacky.js";

const identity = compile(`
push $0
`);

const result = identity(232);

console.log(result);
