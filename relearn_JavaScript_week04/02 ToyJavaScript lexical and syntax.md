# Defining JavaScript lexical and syntax with production

* InputElement ::= WhiteSpace | LineTerminator | Comment |Token

* WhiteSpace ::= " " |"  "

* LineTerminator ::="\n" | "\r"

* Comment ::= SingleLineComment | MultiLineComment
* SingleLineComment ::="/" "/"<any>*
* MultiLineComment ::="/" "*" {[^*] | "*" [^/]} "*" "/"

* Token ::= Literal | KeyWords | Identifier | Punctuator
* Literal ::=NumberLiteral | BooleanLiteral | StringLiteral |NullLiteral
* KeyWords ::= "if" | "else" | "for" | "function" ...
* Identifier ::= IdentifierStart | IdentifierPart
* IdentifierStart ::= "$" | "_" | UnicodeIDStart
* IdentifierPart ::= UnicodeIDContinue
* Punctuator ::= "+" | "-" | "*" | "/" | "{" | "}" | "(" | ")" | "=>" ...
