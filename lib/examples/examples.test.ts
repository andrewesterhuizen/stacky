import { add, divide, multiply, subtract } from "./arithmetic";
import { fibonacci } from "./fibonacci";
import {
  equal,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  notEqual,
} from "./logic";
import { dup, identity, pushTwoVariables, swap } from "./stack";

const randomInt = (max: number) => Math.floor(Math.random() * max);

describe("examples", () => {
  describe("stack", () => {
    const n = randomInt(10000);
    test("identity", () => {
      expect(identity(n)).toBe(n);
    });

    test("pushTwoVariables", () => {
      expect(pushTwoVariables(randomInt(10000), n)).toBe(n);
    });

    test("swap", () => {
      expect(swap(n, randomInt(10000))).toBe(n);
    });

    test("dup", () => {
      expect(dup(n)).toBe(n);
    });
  });

  describe("maths", () => {
    const a = randomInt(10000);
    const b = randomInt(10000);

    test("add", () => {
      expect(add(a, b)).toBe(a + b);
    });

    test("subtract", () => {
      expect(subtract(a, b)).toBe(a - b);
    });

    test("divide", () => {
      expect(divide(a, b)).toBe(Math.floor(a / b));
    });

    test("multiply", () => {
      expect(multiply(a, b)).toBe(a * b);
    });
  });

  describe("logic", () => {
    test("equal", () => {
      expect(equal(1, 1)).toBe(1);
      expect(equal(1, 2)).toBe(0);
    });

    test("not equal", () => {
      expect(notEqual(1, 1)).toBe(0);
      expect(notEqual(1, 2)).toBe(1);
    });

    test("greater than", () => {
      expect(greaterThan(1, 1)).toBe(0);
      expect(greaterThan(1, 2)).toBe(0);
      expect(greaterThan(2, 1)).toBe(1);
    });

    test("greater than or equal", () => {
      expect(greaterThanOrEqual(1, 1)).toBe(1);
      expect(greaterThanOrEqual(1, 2)).toBe(0);
      expect(greaterThanOrEqual(2, 1)).toBe(1);
    });

    test("less than", () => {
      expect(lessThan(1, 1)).toBe(0);
      expect(lessThan(1, 2)).toBe(1);
      expect(lessThan(2, 1)).toBe(0);
    });

    test("less than or equal", () => {
      expect(lessThanOrEqual(1, 1)).toBe(1);
      expect(lessThanOrEqual(1, 2)).toBe(1);
      expect(lessThanOrEqual(2, 1)).toBe(0);
    });
  });

  describe("fibonacci", () => {
    const fibonacciTestData = [
      { input: 0, output: 0 },
      { input: 1, output: 1 },
      { input: 2, output: 1 },
      { input: 3, output: 2 },
      { input: 4, output: 3 },
      { input: 5, output: 5 },
      { input: 6, output: 8 },
      { input: 7, output: 13 },
      { input: 8, output: 21 },
      { input: 9, output: 34 },
      { input: 10, output: 55 },
      { input: 11, output: 89 },
      { input: 12, output: 144 },
      { input: 13, output: 233 },
      { input: 14, output: 377 },
      { input: 15, output: 610 },
      { input: 16, output: 987 },
      { input: 17, output: 1597 },
      { input: 18, output: 2584 },
      { input: 19, output: 4181 },
      { input: 20, output: 6765 },
    ];

    for (const { input, output } of fibonacciTestData) {
      test(`fibonacci(${input}) == ${output}`, () => expect(fibonacci(input)).toBe(output));
    }
  });
});
