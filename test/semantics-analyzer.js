'use strict';

const test = require('ava');
const WaitGroup = require('wait-group-promise');

const { getCode } = require('../src/utils');
const SemanticAnalyzer = require('../src/semantic-analyzer');


test('validating 5 * (3 + 2 * (4 - 5) + 3) - 1', async (t) => {

  const wg = new WaitGroup();
  const semanticAnalyzer = new SemanticAnalyzer();

  const expected = [
    { lda: 4, opValue: 5, solved: 'T1', op: 'SUB' },
    { lda: 2, opValue: 'T1', solved: 'T2', op: 'MUL'  },
    { lda: 3, opValue: 'T2', solved: 'T3', op: 'ADA'  },
    { lda: 'T3', opValue: 3, solved: 'T4', op: 'ADA'  },
    { lda: 5, opValue: 'T4', solved: 'T5', op: 'MUL'  },
    { lda: 'T5', opValue: 1, solved: 'T6', op: 'SUB'  },
  ];

  wg.add(6);
  let index = 0;
  semanticAnalyzer.on('solved', ({ operator, firstOperand, secondOperand, tcount}) => {

    t.is(expected[index].lda, secondOperand);
    t.is(expected[index].opValue, firstOperand);
    t.is(expected[index].solved, `T${tcount}`);
    t.is(expected[index].op, getCode(operator));
    index++;
    // console.log(`LDA ${secondOperand}\n${getCode(operator)} ${firstOperand}\nSTA T${tcount}\n\n`);
    wg.done();
  });

  semanticAnalyzer.processRecursively('5 * (3 + 2 * (4 - 5) + 3) - 1');

  await wg.wait();

  t.pass();
});