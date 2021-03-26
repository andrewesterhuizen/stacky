import { compile } from "./stacky/stacky.js";

const count_until = compile(`
push 0
loop:
push 1
add
dup
push $0
eq
jumpz loop
`);

const result = count_until(10);
console.log(result);
