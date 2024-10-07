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
    displayState = FREEZE;
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

const FREEZE = 'freeze';
const STACK = 'stack';
let displayState = FREEZE;
let displayValue;

let opActive = false;
let currentOp = '';
let firstValue = 0;
let secondValue = 0;

numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (displayState === FREEZE) {
            display.textContent = btn.id;
            displayState = STACK;
        } else {
            display.textContent += btn.id;
        };
        displayValue = display.textContent;
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
            firstValue = display.textContent = result;
            currentOp = btn.textContent;
        } else {
            secondValue = +display.textContent;
            result = operate(firstValue, secondValue, currentOp);
            firstValue = display.textContent = result;
        };
        displayState = FREEZE;
    });
});

equalBtn.addEventListener("click", () => {
    secondValue = +display.textContent;
    result = operate(firstValue, secondValue, currentOp);
    if (!result) result = display.textContent;
    display.textContent = result;

    resetCalc();
});

clearBtn.addEventListener("click", () => {
    resetCalc();
    display.textContent = 0;
});

decimalBtn.addEventListener("click", () => {
    if (display.textContent.includes(".") && displayState !== FREEZE) return; // prevents multiple decimal points
    if (displayState === FREEZE) {
        display.textContent = "0.";
    } else {
        display.textContent += ".";
    }
    displayState = STACK;
    displayValue = display.textContent;
});

flipBtn.addEventListener("click", () => {
    if (display.textContent.includes("-")) {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = "-" + display.textContent;
    }
});

percentBtn.addEventListener("click", () => {
    display.textContent = (+display.textContent / 100).toPrecision(3);
    displayState = FREEZE;
})

