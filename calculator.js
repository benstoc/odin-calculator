function add (a, b) {
    result = (a + b).toString();
    if (result.length > 8)
        return Number(result).toPrecision(5);
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    result = (a * b).toString();
    if (result.length > 8)
        return Number(result).toPrecision(2);
    return a * b;
}

function divide (a, b) {
    if (b === 0) {
        return "Nice try";
    }
    return parseFloat((a / b).toFixed(6));
}

function operate (a, b, operator) {
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
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

function updateDisplay () {
    if (displayValue.length > 9) {
        display.textContent = displayValue.slice(0, 9);
        return;
    }
    display.textContent = displayValue;
}

function resetCalc () {
    firstValue = 0;
    secondValue = 0;
    currentOp = '';
    opActive = false;
    displayFrozen = true
}

buttons.forEach(btn => {
    btn.tabIndex = -1;
});

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
    if (displayValue.toString().includes(".") && !opActive) return; // prevents multiple decimal points
    if (displayFrozen) {
        displayValue = "0.";
    } else {
        displayValue += ".";
    }
    displayFrozen = false;
    updateDisplay();
});

flipBtn.addEventListener("click", () => {
    if (displayValue.toString().charAt(0) === '-') {
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


window.addEventListener("keydown", (e) => {
    const keyBtn = document.querySelector(`button[data-key="${e.key}"]`)
    keyBtn.click();
    keyBtn.classList.add(`${keyBtn.classList[0]}-active`)

    setTimeout(() => {
        keyBtn.classList.remove(`${keyBtn.classList[0]}-active`);
    }, 50);
})


