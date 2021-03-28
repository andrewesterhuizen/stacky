# Stacky

A stack based VM and assembly mini language that can be run inside JavaScript programs

## Examples

TODO:

- entry points
- labels
- jumps
- subroutines
- conditionals
- comments

```javascript
import { compile } from "./stacky";

// simple program
const addNumbers = compile(`
push 5
push 8
add
`);

const result = addNumbers();

// with an argument
const addOne = compile(`
push $0
push 1
add
`);

const valuePlusOne = addOne(1);

// with multiple args
const addThreeNumbers = compile(`
push $0
push $1
add
push $2
add
`);

const sum = addThreeNumbers(1, 2, 3);
```

## Instructions:

### Stack

Operations for interacting with stack

```
push 5 ; Push literal value
push $0 ; Push variable at index 0

pop ; Remove value from stack. Value is discarded

swap ; Swaps two values from the top of the stack

dup ; Pushes a duplicate of value on top of stack
```

### Subroutines

```
call my_label ; Saves return address to call stack and jump to address at label

ret ; Return from subroutine back to address where subroutine was called
```

### Jumps

```
jump my_label; Unconditional jump to address at label
jumpz my_label; Pops value from stack and jumps if value is zero
jumpnz my_label; Pops value from stack and jumps if value is non zero
```

### Arithmetic

Arithmetic instructions pop the 2 top most items on the stack and perform a math operation on those items. The result of the operation is pushed back on to the stack.

```
add ; +
sub ; -
mul ; *
div ; /
```

### Logic

Logic instructions pop the 2 top most items on the stack and perform a logical comparison on those items. The values `1` or `0` are pushed back on to the stack depending on the result of the logical comparison.

```
eq  ; ==
neq ; !=
gt  ; >
gte ; >=
lt  ; <
lte ; <=
```
