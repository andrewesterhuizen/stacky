import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "lib/index.ts",
    output: {
      file: "build/stacky.js",
      format: "es",
      sourcemap: "inline",
    },
    plugins: [typescript()],
  },
];
