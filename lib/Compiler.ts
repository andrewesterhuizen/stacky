import Lexer from "./Lexer";
import Parser from "./Parser";

export default class Compiler {
  compile(source: string) {
    const tokens = new Lexer().getTokens(source);
    console.log("tokens", tokens);
    const { instructions, entryPoint } = new Parser().parse(tokens);
    console.log("instructions", instructions);
    return { instructions, entryPoint };
  }
}
