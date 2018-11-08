


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

function display(op, val1, val2, tcounter) {
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

  console.log(`LDA ${val2}\n${code} ${val1}\nSTA T${tcounter}\n\n`);
}

function findEqualOrPriority(operators, currOp) {
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



const expression = "5 * (3 + 2 * (4 - 5) + 3) - 1";
let i = 0;
let tcount = 0;

function solve(A, B, prevB) {
  while (A.length > 0) {
    tcount++;
    display(A.pop(), B.pop(), B.pop(), tcount);
    prevB.push(`T${tcount}`);
  }
}

const stacksA = [];
const stacksB = [];
const A = [];
const B = [];

function main(A, B) {
  const c = expression.charAt(i);
  if (isSymbol(c)) {
    if (findEqualOrPriority(A, c)) {
      solve(A, B, B);
    }
    A.push(c);
    i++;
    main(A, B);
    return;
  }

  if (isNumber(c)) {
    B.push(parseInt(c));
    i++;
    main(A, B);
    return 
  }

  if (inner(c)) {
    stacksA.push(A);
    stacksB.push(B);
    i++;
    main([], []);
    return;
  }

  if (leave(c)) {
    const prevB = stacksB.pop();
    solve(A, B, prevB);
    i++;
    main(stacksA.pop(), prevB); 
    return;
  }

  if (c == '\0' || !c) {
    solve(A, B, B);
    return;
  }

  i++;
  return main(A, B);
}


main(A, B);