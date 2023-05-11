const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: false,
    operator: null,
};

// Function for input values
function inputValue(value) {
    const { displayValue, secondOperand } = calculator;

    // updates display with the second number clicked 
    if (secondOperand === true) {
        calculator.displayValue = value;
        calculator.secondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? value : displayValue + value;
    }
}

// Function handles converiting string to numbers
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

// Calculates numbers
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

// Once cleared, input bar is back to zero
function reset() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = false;
    calculator.operator = null;
}

// Updates display
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
