//@ts-check
import Lexer from "./Lexer.js";
import Parser from "./Parser.js";

export default class Compiler {
  compile(source) {
    const tokens = new Lexer().getTokens(source);
    console.log("tokens", tokens);
    const instructions = new Parser().parse(tokens);
    console.log("instructions", instructions);
    return instructions;
  }
}
