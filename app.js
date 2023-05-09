const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: false,
    operator: null,
};

function inputValue(value) {
    const { displayValue, secondOperand } = calculator;

    if (secondOperand === true) {
        calculator.displayValue = value;
        calculator.secondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? value : displayValue + value;
    }
}

function handleOperations(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const firstValue = parseFloat(displayValue);

    if(operator && calculator.secondOperand){
        calculator.operator = nextOperator;
        return;
    }

    if(firstOperand == null && !isNaN(firstValue)){
        calculator.firstOperand = firstValue;
    } else if(operator) {
        const currentValue = firstOperand || 0;
        const result = calculate(currentValue, firstValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.secondOperand = true;
    calculator.operator = nextOperator;
}

function calculate( firstOperand, secondOperation, operator){
    if(operator === '+') {
        return firstOperand + secondOperation;
    } else if(operator === '-') {
        return firstOperand - secondOperation;
    } else if(operator === '*') {
        return firstOperand * secondOperation;
    } else if(operator === '/') {
        return firstOperand / secondOperation;
    }

    return secondOperation;
}

function reset() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    const display = document.querySelector('.calculator-input');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperations(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    reset();
    updateDisplay();
    return;
  }

  inputValue(target.value);
  updateDisplay();
});