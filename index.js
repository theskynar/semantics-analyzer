'use strict';

const SemanticAnalyzer = require('./src/semantic-analyzer');
const { getCode } = require('./src/utils');

const semanticAnalyzer = new SemanticAnalyzer();
console.log('\n############### Results ###################\n');
semanticAnalyzer.on('solved', ({ operator, firstOperand, secondOperand, tcount }) => {
  console.log(`LDA ${secondOperand}\n${getCode(operator)} ${firstOperand}\nSTA T${tcount}\n\n`);
});
semanticAnalyzer.processRecursively('(((5+6*((6-2)+6)-7) + 2) + 1)');
// semanticAnalyzer.processRecursively("5 * (3 + 2 * (4 - 5) + 3) - 1")
