function add (a, b) {
    result = (a + b).toString();
    if (result.length > 8)
        return Number(result).toPrecision(5);
    return a + b;
}

function subtract (a, b) {
    result = (a - b).toString();
    if (result.length > 8)
        return Number(result).toPrecision(5);
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

const MAX_DISPLAY_LENGTH = 9;
const MAX_NUMBER_LENGTH = 8;

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
let operatorActive = false;
let currentOperation = '';
let firstValue = 0;
let secondValue = 0;

function updateDisplay () {
    if (displayValue.length > MAX_DISPLAY_LENGTH) {
        display.textContent = displayValue.slice(0, MAX_DISPLAY_LENGTH);
        return;
    }
    display.textContent = displayValue;
}

function resetCalc () {
    firstValue = 0;
    secondValue = 0;
    currentOperation = '';
    operatorActive = false;
    displayFrozen = true
    removeActiveClass();
}

function removeActiveClass () {
    operatorBtns.forEach(btn => {
        btn.classList.remove("operator-active");
    });
}

buttons.forEach(btn => {
    btn.tabIndex = -1; // NOT TABABLE
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
        if (!operatorActive) {
            currentOperation = btn.id;
            firstValue = +display.textContent;
            operatorActive = true;
            btn.classList.add("operator-active");
        } else if (operatorActive && currentOperation !== btn.id) {
            removeActiveClass()
            secondValue = +display.textContent;
            result = operate(firstValue, secondValue, currentOperation);
            firstValue = displayValue = result;
            currentOperation = btn.id;
            btn.classList.add("operator-active");
        } else {
            secondValue = +display.textContent;
            result = operate(firstValue, secondValue, currentOperation);
            firstValue = displayValue = result;
        };

        if (Array.from(btn.classList).includes("operator-active")) {
            btn.classList.add("disable-hover");
        } else {
            btn.classList.remove("disable-hover");
        };

        displayFrozen = true;
        updateDisplay()
    });
});

equalBtn.addEventListener("click", () => {
    secondValue = +display.textContent;
    result = operate(firstValue, secondValue, currentOperation);
    if (!result) result = display.textContent;
    displayValue = result;

    updateDisplay();
    resetCalc();
});

clearBtn.addEventListener("click", () => {
    resetCalc();
    display.textContent = 0;
    displayValue = 0;
});

decimalBtn.addEventListener("click", () => {
    if (displayValue.toString().includes(".") && !operatorActive) return; // prevents multiple decimal points
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
});


window.addEventListener("keydown", (e) => {
    const keyBtn = document.querySelector(`button[data-key="${e.key}"]`);
    if (!keyBtn) return;
    keyBtn.click();

    if (!Array.from(keyBtn.classList).includes("operator")) {
        let activeClass = `${keyBtn.classList[0]}-active`
        keyBtn.classList.add(activeClass)
        setTimeout(() => keyBtn.classList.remove(activeClass), 50);
    }
});


