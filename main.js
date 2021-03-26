import { compile } from "./stacky/stacky.js";

const nPlusOneIsLessThan = compile(`
push $0
push 1
add
push $1
lt
`);

const result = nPlusOneIsLessThan(1, 15);

console.log(result);
