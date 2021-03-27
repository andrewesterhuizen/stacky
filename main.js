import { compile } from "./stacky/stacky.js";

const compute_fibonacci = compile(`
fib:
    dup
    push 1
    lte
    jumpz fib_after_ret
    ret

    fib_after_ret:
        dup
        push 1
        sub
        call fib

        swap

        push 2
        sub
        call fib

        add

        ret

start:
    push $0
    call fib
`);

const result = compute_fibonacci(17);
console.log(result);
