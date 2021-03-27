import { compile } from "./stacky/stacky.js";

const compute_fibonacci = compile(`
fib:
    dup
    push 1
    lte
    ; we want to return n only if n <= 1
    jumpz fib_after_ret
    ret

    ; compute and return fib(n-1) + fib(n-2)
    fib_after_ret:
        dup ; saving duplicate of n for 2nd call of fib

        ; fib(n-1)
        push 1
        sub
        call fib

        swap ; swap return of fib(n-1) and saved version of n from earlier

        ; fib(n-2)
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
