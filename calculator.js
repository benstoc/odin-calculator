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
    return a / b;  // limit decimal places
}

function operate (a, b, operator) {
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
}

function resetCalc () {
    firstValue = 0;
    secondValue = 0;
    currentOp = '';
    opActive = false;
}

const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");

let displayValue;
let displayState = 'freeze';
let opActive = false;

let currentOp = ''
let firstValue;
let secondValue;

numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (displayState === "freeze") {
            display.textContent = btn.id;
            displayState = "stack";
        } else {
            display.textContent += btn.id;
        };
        displayValue = display.textContent;
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentOp = btn.textContent;
        if (!opActive) {
            firstValue = +display.textContent;
            displayState = "freeze";
            opActive = true;
        } else {
            secondValue = +display.textContent;
            result = operate(firstValue, secondValue, currentOp);
            firstValue = display.textContent = result;
            displayState = "freeze";
        }
    });
});

equalBtn.addEventListener("click", () => {
    secondValue = +display.textContent;
    result = operate(firstValue, secondValue, currentOp);
    display.textContent = result;

    resetCalc();

    //firstValue = 0;
    //secondValue = 0;
    //currentOp = '';
    //opActive = false;
})