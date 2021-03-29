import { compile } from "./build/stacky.js";

const addTwoNumbers = compile(`
push $0
push $1
add
`);

const result = addTwoNumbers(1, 2);
console.log(result);
