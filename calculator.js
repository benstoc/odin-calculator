function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return parseFloat((a / b).toFixed(7));
}

function operate (a, b, operator) {
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b).toPrecision(4);
    if (operator === '/') return divide(a, b);
}

function resetCalc () {
    firstValue = 0;
    secondValue = 0;
    currentOp = '';
    opActive = false;
    displayFrozen = true
}

function updateDisplay () {
    if (displayValue.length > 9) {
        display.textContent = displayValue.slice(0, 9);
        return;
    }
    display.textContent = displayValue;
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const decimalBtn = document.querySelector(".decimal");
const percentBtn = document.querySelector(".percent");
const flipBtn = document.querySelector(".flip");

let displayFrozen = true;
let displayValue = 0;
let opActive = false;
let currentOp = '';
let firstValue = 0;
let secondValue = 0;

numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (displayFrozen) {
            displayValue = btn.id;
            displayFrozen = false;
        } else {
            displayValue += btn.id;
        };
        updateDisplay();
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!opActive) {
            currentOp = btn.textContent;
            firstValue = +display.textContent;
            opActive = true;
        } else if (opActive && currentOp !== btn.textContent) {
            secondValue = +display.textContent;
            result = operate(firstValue, secondValue, currentOp);
            firstValue = displayValue = result;
            currentOp = btn.textContent;
        } else {
            secondValue = +display.textContent;
            result = operate(firstValue, secondValue, currentOp);
            firstValue = displayValue = result;
        };
        displayFrozen = true;
        updateDisplay()
    });
});

equalBtn.addEventListener("click", () => {
    secondValue = +display.textContent;
    result = operate(firstValue, secondValue, currentOp);
    if (!result) result = display.textContent;
    displayValue = result;

    updateDisplay();
    resetCalc();
});

clearBtn.addEventListener("click", () => {
    resetCalc();
    display.textContent = 0;
});

decimalBtn.addEventListener("click", () => {
    if (displayValue.includes(".") && !opActive) return; // prevents multiple decimal points
    if (displayFrozen) {
        displayValue = "0.";
    } else {
        displayValue += ".";
    }
    displayFrozen = false;
    updateDisplay();
});

flipBtn.addEventListener("click", () => {
    if (displayValue.includes("-")) {
        displayValue = display.textContent.slice(1);
    } else {
        displayValue = "-" + display.textContent;
    }
    updateDisplay();
});

percentBtn.addEventListener("click", () => {
    displayValue = (+display.textContent / 100).toPrecision(3);
    displayFrozen = true;
    updateDisplay();
})

