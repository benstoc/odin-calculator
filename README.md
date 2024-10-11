# Odin Calculator

## Description
A simple webpage calculator featuring standard arithmetic operations and keyboard support, built as part of The Odin Project's Foundations course. The calculator can handle operations such as addition, subtraction, multiplication, division, and includes functionality for percentages, sign flipping (positive/negative), and backspacing inputs with "Del" button.

## Features

### Display / Output
The display can be either in a **frozen** or **unfrozen** state:
- **Unfrozen:** Allows continuous input of numbers without resetting the display.
- **Frozen:** Activated when an operator is selected, so the next numerical input will clear the display and start a new number. This allows you to input the second number of an operation without manually clearing the previous result.

The display has the following constraints:
- It allows for up to **9 characters**.
- When the result of an operation exceeds **9 characters**, it is automatically converted to **scientific notation**.

### Operator Chaining
You can **chain operators** together without needing to press the equals button in between. When you select a new operator, the first operation is computed, the display freezes, and the result of the first operation becomes the starting number for the next operation.

### Keyboard Support
- **0-9** – Number keys
- **Addition** – `=` (No shift required)
- **Subtraction** – `-`
- **Multiplication** – `*` or `Shift + 8`
- **Division** – `/`
- **Equals** – `Enter/Return`
- **Clear** – `c`
- **Flip sign (positive/negative)** – `f`
- **Del** – `Backspace` or `Delete`

### How to Install/Run
1. Fork and clone this repository by running the following commands:
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```
2. Open the `index.html` file in your browser to use the calculator.

### Technology Stack
- **HTML5**
- **CSS3**
- **JavaScript (ES6)**

### Acknowledgments
- [Hex Color Tool](https://www.hexcolortool.com/): Used to lighten colors by specific percentages for the `:hover` and `:active` pseudoclasses in the calculator's styling.
