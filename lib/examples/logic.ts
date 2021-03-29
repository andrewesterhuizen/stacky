import { compile } from "../index";

export const equal = compile(`
push $0
push $1
eq
`);

export const notEqual = compile(`
push $0
push $1
neq
`);

export const greaterThan = compile(`
push $0
push $1
gt
`);

export const greaterThanOrEqual = compile(`
push $0
push $1
gte
`);

export const lessThan = compile(`
push $0
push $1
lt
`);

export const lessThanOrEqual = compile(`
push $0
push $1
lte
`);
