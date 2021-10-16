import { scan } from "./lexer-parser.js";

const syntax = {
  Program: [["StatementList", "EOF"]],
  StatementList: [["Statement"], ["StatementList", "Statement"]],
  Statement: [
    ["ExpressionStatement"],
    ["IfStatement"],
    ["WhileStatement"],
    ["VariableDeclaration"],
    ["FunctionDeclaration"],
    ["Block"],
    ["BreakStatement"],
    ["ContinueStatement"],
    ["FunctionDeclaration"]
  ],
  FunctionDeclaration: [
    ["function", "Identifier", "(", ")", "(", "Expression", ")", ]
  ],
  BreakStatement: [["break"], ";"],
  ContinueStatement: [["continue"], ";"],
  Block: [["{", "StatementList", "}"], ["{", "}"]],
  WhileStatement: [["while", "(", "Expression", ")", "Statement"]],
  IfStatement: [["if", "(", "Expression", ")", "Statement"]],
  VariableDeclaration: [
    ["const", "Identifier", ";"],
    ["let", "Identifier", ";"],
    ["var", "Identifier", ";"]
    ],
  FunctionDeclaration: [
      ["function", "Identifier", "(", ")", "{", "StatementList", "}"]
    ], 
  ExpressionStatement: [["Expression", ";"]],
  Expression: [["AssignmentExpression"]],
  AssignmentExpression: [
       ["LeftHandSideExpression", "=", "LogicalORExpression"],
       ["LogicalORExpression"]
  ],
  LogicalORExpression: [
    ["LogicalANDExpression"],
    ["LogicalORExpression", "||", "LogicalANDExpression"]
  ],
  LogicalANDExpression: [
    ["AdditiveExpression"],
    ["LogicalANDExpression", "&&", "AdditiveExpression"]
  ],
  AdditiveExpression: [
    ["MultiplicativeExpression"],
    ["AdditiveExpression", "+", "MultiplicativeExpression"],
    ["AdditiveExpression", "-", "MultiplicativeExpression"]
  ],
  MultiplicativeExpression: [
    ["LeftHandSideExpression"],
    ["MultiplicativeExpression", "*", "LeftHandSideExpression"],
    ["MultiplicativeExpression", "/", "LeftHandSideExpression"]
  ],
  LeftHandSideExpression: [
    ["CallExpression"],
    ["NewExpression"]
  ],
  CallExpression: [
    ["MemberExpression", "Arguments"],
    [" CallExpression", "Arguments"]
  ],
  Arguments: [
    ["(", ")"],
    ["(", "ArgumentList", ")"]
  ],
  ArgumentLis: [
    ["AssignmentExpression"],
    ["ArgumentList", ",", "AssignmentExpression"]
  ],
  NewExpression: [
    ["MemberExpression"],
    ["new", "NewExpression"]
  ],
  MemberExpression: [
    ["PrimaryExpression"],
    ["PrimaryExpression", ".", "Identifier"],
    ["PrimaryExpression", "[", "Expression", "]"]
  ],
  PrimaryExpression: [
      ["(", "Expression", ")"], ["Literal"], ["Identifier"]
    ],
  Literal: [
   // ["Number"]
   ["NumericLiteral"],
   ["StringLiteral"],
   ["BooleanLiteral"],
   ["NullLiteral"],
   ["RegularExpressionLiteral"],
   ["ObjectLiteral"],
   ["ArrayLiteral"]
   ],
   ObjectLiteral: [
       ["{", "}"],
       ["{", "PropertyList", "}"]
   ],
   PropertyList: [
       ["Property"],
       ["PropertyList", ",", "Property"]
   ],
   Property: [
       ["StringLiteral", ":", "AdditiveExpression"],
       ["Identifier", "：", "AdditiveExpression"]       
  ],

};

let hash = {};

function closure(state) {
  hash[JSON.stringify(state)] = state;
  let queue = [];

  for (let symbol in state) {
    if (symbol.match(/^\$/)) {
      continue;
    }
    queue.push(symbol);
  }

  while (queue.length) {
   let symbol = queue.shift();
   //console.log(symbol);
    if (syntax[symbol]) {
      for (let rule of syntax[symbol]) {
        // console.log(rule[0]);
        if (!state[rule[0]]) {
          queue.push(rule[0]);
        }

        let current = state;
        for (let part of rule) {
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
        current.$reduceType = symbol;
        current.$reduceLength = rule.length;
      }
    }
  }

  for (let symbol in state) {
    // console.log(symbol, state[symbol]);
    if (symbol.match(/^\$/)) {
      continue;
    }
    if (hash[JSON.stringify(state[symbol])]) {
      state[symbol] = hash[JSON.stringify(state[symbol])];
    } else {
      closure(state[symbol]);
    }
  }
}

let end = { $isEnd: true };
let start = { Program: end };

closure(start);
// console.log(JSON.stringify(start, null, 2));

function parse(source) {
  const stack = [start];

  function reduce() {
    const state = stack[stack.length - 1];

    if (state.$reduceType) {
      const children = [];

      for (let i = 0; i < state.$reduceLength; i++) {
        children.push(stack.pop());
      }

      // create a non-terminal symbol and shift it
      shift({
        type: stack.$reduceType,
        children: children.reverse(),
      });
    }else {
        throw new Errow("Unexpected token");
    }
  }

  function shift(symbol) {
    const state = stack[stack.length - 1];

    if (symbol.type in state) {
      stack.push(symbol);
    } else {
      // reduce to no-terminal symbols
      reduce();
      shift(symbol);
    }
  }

  for (let symbol of scan(source)) {
    // terminal symbols
    shift(symbol);
  }
}

const source = `
  var a;
`;
parse(source);