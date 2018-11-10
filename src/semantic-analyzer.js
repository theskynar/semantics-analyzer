'use strict';

const EventEmitter = require('events');
const { isNumber, isSymbol, equalOrGreaterPriority, leave, inner } = require('./utils');

class SemanticAnalyzer extends EventEmitter {
  constructor() {
    super();
    this.operators = [];
    this.operands = [];
    this.stackOperatorsStorage = [];
    this.stackOperandsStorage = []; 

    this.tcount = 0;
    this.expressionCounter = 0;
  }

  solveStackBehind(prevOperandStack) {
    while (this.operators.length > 0) {
      this.tcount++;
      this.emit('solved', { 
        operator: this.operators.pop(), 
        firstOperand: this.operands.pop(),
        secondOperand: this.operands.pop(),
        tcount: this.tcount 
      });
      if (prevOperandStack) {
        prevOperandStack.push(`T${this.tcount}`);
      } else {
        this.operands.push(`T${this.tcount}`);
      }

    }
  }

  processRecursively(expression) {
    const c = expression.charAt(this.expressionCounter);
    this.expressionCounter++;
    if (isSymbol(c)) {
      if (equalOrGreaterPriority(this.operators, c)) {
        this.solveStackBehind();
      }
      this.operators.push(c);
      return this.processRecursively(expression);
    }
  
    if (isNumber(c)) {
      this.operands.push(parseInt(c));
      return this.processRecursively(expression);
    }
  
    if (inner(c)) {
      this.stackOperatorsStorage.push(this.operators.slice());
      this.stackOperandsStorage.push(this.operands.slice());
      this.operators = [];
      this.operands = [];
      return this.processRecursively(expression);
    }
  
    if (leave(c)) {
      const returnedOperand = this.stackOperandsStorage.pop();
      this.solveStackBehind(returnedOperand);

      this.operands = returnedOperand.slice();
      this.operators = this.stackOperatorsStorage.pop();

      return this.processRecursively(expression);
    }
  
    if (c == '\0' || !c) {
      this.solveStackBehind();
      return;
    }
  
    return this.processRecursively(expression);
  }
}

module.exports = SemanticAnalyzer;