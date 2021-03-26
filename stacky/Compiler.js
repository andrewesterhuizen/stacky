//@ts-check
import Lexer from "./Lexer.js";
import Parser from "./Parser.js";

export default class Compiler {
  compile(source) {
    const tokens = new Lexer().getTokens(source);
    const instructions = new Parser().parse(tokens);
    return instructions;
  }
}
