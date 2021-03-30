# Stacky

A stack based virtual machine and assembly language that can be assembled and run inside JavaScript programs

## API

### compile:

The `compile` function compiles an assembly language program and returns a JavaScript function that will execute it. This function can be executed multiple times and will use a fetch stack and execution context each time it is called. The value on top of the stack at the end of execution is returned.

```javascript
const doSomeMaths = compile(`
push 5
push 8
add
dup
mul
`);

const result = doSomeMaths();
```

### run

The `run` function will compile and run an assembly language program immediately. The value on top of the stack at the end of execution is returned.

```javascript
const result = run(`
push 5
push 8
add
dup
mul
`);
```

### arguments

A program can access data passed to the VM as arguments at the time of execution. These can be accessed using the `$` symbol followed by the 0 indexed position of the argument.

```javascript
const source = `
push $0 ; first argument
push 1
add
push $1 ; second argument
mul
`;

// compile and run
const program = compile(source);
const resultA = program(1, 2);

// run immediately
const resultB = run(source, 3, 4);
```

## Stacky Assembly Language

Programs are defined as a series of instructions that tell the VM how to interact with the stack. Comments can be added by adding text following a `;` character. Any text after the `;` character is ignored by the compiler.

```assembly
push 1
push 2
add ; a comment
```

Labels are used with jump and call instructions to specify a location in the code.

```assembly
push 1

my_label:
    push 1
    add
    jump my_label
```

An execution entry point can be defined by adding a `start:` label. If a start label is not defined the program will begin execution from the first instruction.

```assembly
push 1

my_label:
    push 1
    add

start:
    jump my_label
```

Subroutines are defined with labels and used with `call` and `ret` instructions. When a `call` instruction is executed, the VM will save the current location and start executing the instructions at the label. When a `ret` instruction is executed the VM will resume execution at the place the where the subroutine was called. Subroutines can be called from within other subroutines.

```assembly
add_one:
    push 1
    add
    ret

start:
    push 5
    call add_one
```

## Instructions:

### Stack

Operations for interacting with stack

```assembly
push 5 ; Push literal value
push $0 ; Push arg at index 0

pop ; Remove value from stack. Value is discarded

swap ; Swaps two values from the top of the stack

dup ; Pushes a duplicate of value on top of stack
```

### Subroutines

```assembly
call my_label ; Saves return address to call stack and jump to address at label

ret ; Return from subroutine back to address where subroutine was called
```

### Jumps

```assembly
jump my_label; Unconditional jump to address at label
jumpz my_label; Pops value from stack and jumps if value is zero
jumpnz my_label; Pops value from stack and jumps if value is non zero
```

### Arithmetic

Arithmetic instructions pop the 2 top most items on the stack and perform a math operation on those items. The result of the operation is pushed back on to the stack.

```assembly
add ; +
sub ; -
mul ; *
div ; /
```

### Logic

Logic instructions pop the 2 top most items on the stack and perform a logical comparison on those items. The values `1` or `0` are pushed back on to the stack depending on the result of the logical comparison.

```assembly
eq  ; ==
neq ; !=
gt  ; >
gte ; >=
lt  ; <
lte ; <=
```
