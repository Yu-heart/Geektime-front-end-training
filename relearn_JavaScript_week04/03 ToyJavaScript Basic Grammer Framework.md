# Basic grammer framework
InputElement ::= WhiteSpace | LineTerminator | Comment |Token

WhiteSpace ::= " " |"  "

LineTerminator ::="\n" | "\r"

Comment ::= SingleLineComment | MultiLineComment
SingleLineComment ::="/" "/"<any>*
MultiLineComment ::="/" "*" {[^*] | "*" [^/]} "*" "/"

Token ::= Literal | KeyWords | Identifier | Punctuator
Literal ::=NumberLiteral | BooleanLiteral | StringLiteral |NullLiteral
KeyWords ::= "if" | "else" | "for" | "function" ...
Identifier ::= IdentifierStart | IdentifierPart
IdentifierStart ::= "$" | "_" | UnicodeIDStart
IdentifierPart ::= UnicodeIDContinue
Punctuator ::= "+" | "-" | "*" | "/" | "{" | "}" | "(" | ")" | "=>" ...

Program ::= Statement +
Statement ::= ExpressionStatement | IfStatement 
     | ForStatement | WhileStatement | VariableDeclaration
     | FunctionDeclaration | ClassDeclaration | BreakStatement
     | ContinueStatement | ReturnStatement | ThrowStatement 
     | TryStatement | Block

ExpressionStatement ::= Expression ";" 

Expression ::= AdditiveExpression

AdditiveExpression ::= MultiplicativeExpression 
     | AdditiveExpression ("+" | "-") MultiplicativeExpression 

MultiplicativeExpression ::= UnaryExpression 
     | MultiplicativeExpression ("*" | "/") UnaryExpression 

UnaryExpression ::= PrimaryExpression 
     | ("+" | "-" | "typeof") PrimaryExpression

PrimaryExpression ::= "(" Expression ")" | Literal | Identifier

IfStatement ::= "if" "(" Expression ")" Statement 

Block ::= "{" Statement "}"

TryStatement ::= "try" "{" Statement+ "}" "catch" "(" Expression ")" "{" Statement+ "}"