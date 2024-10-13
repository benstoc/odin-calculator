function operate (a, b, operator) {
    let result;
    let precision = 5;

    if (operator === '+') result = (a + b);
    if (operator === '-') result = (a - b);
    if (operator === '*') result = (a * b), precision = 2;
    if (operator === '/') {
        if (b === 0) return "Nice try";
        result = parseFloat((a / b).toPrecision(precision));
    }

    if (String(result).length > MAX_DISPLAY_LENGTH) {
        result = result.toPrecision(precision)
    }

    return result;
}

const MAX_DISPLAY_LENGTH = 10;
const MAX_NUMBER_LENGTH = 8;
const OPERATOR_ACTIVE_CLASS = "med-color-active";

const containter = document.querySelector(".container");
const display = document.querySelector(".display-main");
const history = document.querySelector(".display-history");
const buttons = document.querySelectorAll("button");
const operatorBtns = document.querySelectorAll(".operator");

let displayFrozen = true;
let displayValue = 0;
let currentOperator = '';
let firstValue = 0;
let secondValue = 0;

containter.addEventListener("click", event => {
    const btn = event.target.closest("button");
    if (!btn) return;

    if (btn.classList.contains("number")) numberEvent(btn);
    if (btn.classList.contains("decimal")) decimalEvent();
    if (btn.classList.contains("operator")) operatorEvent(btn);
    if (btn.classList.contains("equal")) equalEvent(btn);
    if (btn.classList.contains("flip")) flipEvent();
    if (btn.classList.contains("percent")) percentEvent();
    if (btn.classList.contains("clear")) clearEvent();
    if (btn.classList.contains("back")) backEvent();

    updateDisplay();
})

function updateDisplay() {
    if (displayValue.length > MAX_DISPLAY_LENGTH) {
        displayValue = displayValue.slice(0, MAX_DISPLAY_LENGTH);
    } else if (displayValue.length === 0) {
        displayValue = 0;
        displayFrozen = true;
    }
    display.textContent = displayValue;
}

function updateHistory(btn) {
    if (btn.id === "=") {
        history.textContent = `${firstValue} ${currentOperator} ${secondValue} =`;
    } else {
        history.textContent = `${firstValue} ${currentOperator}`;
    }
}

function resetCalc() {
    firstValue = 0;
    secondValue = 0;
    currentOperator = '';
    displayFrozen = true;
    removeActiveClass();
}

function numberEvent(btn) {
    if (displayFrozen) {
        displayValue = btn.id;
        displayFrozen = false;
    } else {
        displayValue += btn.id;
    }
}

function decimalEvent() {
    if (displayValue.toString().includes(".") && !currentOperator) return; // prevents multiple decimal points
    if (displayFrozen) {
        displayValue = "0.";
    } else {
        displayValue += ".";
    }
    displayFrozen = false;
}

function operatorEvent(btn) {
    if (!currentOperator) {
        currentOperator = btn.id;
        firstValue = Number(display.textContent);
        btn.classList.add(OPERATOR_ACTIVE_CLASS);
    } else {
        handleSecondInput(btn);
    }
    updateOperatorClasses(btn);
    updateHistory(btn);
    displayFrozen = true;
}

function handleSecondInput(btn) {
    secondValue = Number(display.textContent);
    result = operate(firstValue, secondValue, currentOperator);

    if (firstValue && currentOperator) updateHistory(btn);
    if (!result && result !== 0) result = display.textContent;

    firstValue = displayValue = result;
    if ((currentOperator !== btn.id) && (btn.id !== "=")) {
        removeActiveClass();
        currentOperator = btn.id;
        btn.classList.add(OPERATOR_ACTIVE_CLASS);
    }
}

function removeActiveClass() {
    operatorBtns.forEach(btn => {
        btn.classList.remove(OPERATOR_ACTIVE_CLASS);
    });
}

function updateOperatorClasses(btn) {
    if (btn.classList.contains(OPERATOR_ACTIVE_CLASS)) {
        btn.classList.add("disable-hover");
    } else {
        btn.classList.remove("disable-hover");
    }
}

function equalEvent(btn) {
    handleSecondInput(btn);
    resetCalc();
}

function clearEvent() {
    resetCalc();
    display.textContent = 0;
    history.textContent = ''
    displayValue = 0;
}

function flipEvent() {
    if (displayValue <= 0) {
        displayValue = display.textContent.slice(1);
    } else {
        displayValue = "-" + display.textContent;
    }
}

function percentEvent() {
    result = Number(display.textContent) / 100;
    if (String(result).length > 9) result = result.toPrecision();

    displayValue = result;
    displayFrozen = true;
}

function backEvent() {
    displayValue = display.textContent.slice(0, -1);
    if (displayValue === '-') displayValue = 0;
    updateDisplay();
}

window.addEventListener("keydown", (e) => {
    const keyBtn = document.querySelector(`button[data-key="${e.key}"]`);
    if (!keyBtn) return;
    keyBtn.click();

    if (!keyBtn.classList.contains("operator")) {
        let activeClass = `${keyBtn.classList[1]}-active`
        keyBtn.classList.add(activeClass)
        setTimeout(() => keyBtn.classList.remove(activeClass), 50);
    }
});

buttons.forEach(btn => {
    btn.tabIndex = -1; // NOT TABABLE
});
