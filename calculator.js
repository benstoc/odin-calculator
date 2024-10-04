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

const display = document.querySelector(".display");
const numberBtns = document.querySelectorAll(".number");
let displayValue;
let displayState = 'freeze'

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
    
})