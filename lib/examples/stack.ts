import { compile } from "../index";

export const identity = compile("push $0");

export const pushTwoArgs = compile(`
push $0
push $1
`);

export const swap = compile(`
push $0
push $1
swap
`);

export const dup = compile(`
push $0
dup
`);
