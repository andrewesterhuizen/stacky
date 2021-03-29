import { compile } from "../index";

export const add = compile(`
push $0
push $1
add
`);

export const subtract = compile(`
push $0
push $1
sub
`);

export const divide = compile(`
push $0
push $1
div
`);

export const multiply = compile(`
push $0
push $1
mul
`);
