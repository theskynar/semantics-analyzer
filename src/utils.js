'use strict';

function isNumber(c)
{
  if (c >= '0' && c <= '9')
  {
   return 1;
  }
  return 0;
}

function isSymbol(c)
{
  if (c == '+')
  {
    return 1;
  }
  if (c == '-')
  {
    return 1;
  }
  if (c == '*')
  {
    return 1;
  }
  if (c == '/')
  {
    return 1;
  }
  return 0;
}

function isBlank(c)
{
  if (c == ' ')
  {
    return 1;
  }
  return 0;
}

function inner(c) {
  if (c == '(') {
    return 1;
  }
  return 0;
}

function leave(c) {
  if (c == ')') {
    return 1;
  }
  return 0;
}

function getCode(op) {
  let code;
  if (op == '+')
  {
    code = "ADA";
  }
  if (op == '-')
  {
    code = "SUB";
  }
  if (op == '*')
  {
    code = "MUL";
  }
  if (op == '/')
  {
    code = "DIV";
  }

  return code;
}

function equalOrGreaterPriority(operators, currOp) {
  for (const op of operators) {
    if ((op == '*' || op == '/')) {
      return 1;
    }
    if((op == '+' || op == '-') && (currOp == '+' || currOp == '-')) {
      return 1;
    }
  }

  return 0;
}

module.exports = {
  equalOrGreaterPriority,
  leave,
  inner,
  isBlank,
  isNumber,
  isSymbol,
  getCode
};