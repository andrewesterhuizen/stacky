import Lexer from "./Lexer";
import Parser from "./Parser";

export default class Compiler {
  compile(source: string) {
    const tokens = new Lexer().getTokens(source);
    const { instructions, entryPoint } = new Parser().parse(tokens);
    return { instructions, entryPoint };
  }
}
