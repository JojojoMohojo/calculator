let display = document.querySelector(".display");
display.textContent = "0";
let firstNumber = "";
let secondNumber = "";
let operator = "";
let result;
let decimalActive = false;
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let operators = ["+", "/", "*", "-"];

//mathematical functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// calls the correct math function
function operate(num1, num2, op) {
    switch(op) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "x":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }
}

// rounds to two decimals places for the display
function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
};

//reset all
function resetCalc() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = undefined;
    decimalActive = false;
};

//check after every button press
function setDecimalActive() {
    if ((firstNumber.includes(".") && operator === "") || (secondNumber.includes(".") && operator !== "")) {
        decimalActive = true;
    } else {
        decimalActive = false;
    };
};

//button functions
function numButton(target) {
    if (operator === "") {
        if (firstNumber === "" || result !== undefined) {
            firstNumber = target;
            display.textContent = target;
            
        } else {
            firstNumber += target;
            display.textContent += target;
        };
    } else {
        if (secondNumber === "") {
            secondNumber = target;
            display.textContent = target;
        } else {
            secondNumber += target;
            display.textContent += target;
        };
    };
    result = undefined;
};

function dotButton(target) {
    if (firstNumber !== "" && secondNumber === "") {
        firstNumber += target;
        display.textContent += target;
    } else if (secondNumber !== "") {
        secondNumber += target;
        display.textContent += target;
    };
};

function operButton(target) {
    if (firstNumber !== "") {
        if (operator !== "" && secondNumber !== "") {
            if (secondNumber === "0" && operator === "/") {
                display.textContent = "Oi cheeky cunt";
                resetCalc();
            } else {
                result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
                display.textContent = roundToTwoDecimals(result).toString();
                operator = target;
                firstNumber = result.toString();
                secondNumber = "";
            };
        } else if (operator === "") {
            operator = target;
        };
    };
};

function equalsButton() {
    if (secondNumber === "0" && operator === "/") {
        display.textContent = "Oi cheeky cunt";
        resetCalc();
    } else {
        result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
        display.textContent = roundToTwoDecimals(result).toString();
        firstNumber = result.toString();
        operator = "";
        secondNumber = "";
    };   
};

function clearButton() {
    resetCalc();
    display.textContent = "0";
};

function backspaceButton() {
    if (firstNumber !== "" && firstNumber !== "0" && operator === ""  ) {
        firstNumber = firstNumber.slice(0, -1);
        if (firstNumber === "") {
            display.textContent = "0";
        } else {
            if (display.textContent.slice(-2, -1) === ".") {
                firstNumber = firstNumber.slice(0, -1);
                display.textContent = display.textContent.slice(0, -2);
            } else {
                display.textContent = display.textContent.slice(0, -1);
            };
        };
    } else if (secondNumber !== "" && secondNumber !== "0") {
        secondNumber = secondNumber.slice(0, -1);
        if (secondNumber === "") {
            display.textContent = "0";
        } else {
            if (display.textContent.slice(-2, -1) === ".") {
                secondNumber = secondNumber.slice(0, -1);
                display.textContent = display.textContent.slice(0, -2);
            } else {
                display.textContent = display.textContent.slice(0, -1);
            };
        };
    };
    result = undefined;
};

document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button");
    //any button press
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            targetButton = event.target;
            targetButtonText = targetButton.textContent;
            if (targetButton.classList.contains("num")) {
                numButton(targetButtonText);
            } else if (targetButton.id === "dot" && decimalActive === false && result === undefined) {
                dotButton(targetButtonText);
            } else if (targetButton.classList.contains("oper")) {
                operButton(targetButtonText);
            } else if (targetButton.id === "equals" && secondNumber !== "") {
                equalsButton();
            } else if (targetButton.id === "clear") {
                clearButton();
            } else if (targetButton.id === "backspace") {
                backspaceButton();
            };
            setDecimalActive();
            outputValues(targetButtonText);
        });
    });
    // any keyboard press
    document.addEventListener(("keydown"), () => {
        targetKey = event.key;
        if (numbers.includes(targetKey)) {
            numButton(targetKey);
        } else if (targetKey === "." && decimalActive === false && result === undefined) {
            dotButton(targetKey);
        } else if (operators.includes(targetKey)) {
            operButton(targetKey);
        } else if ((targetKey === "Enter"  || targetKey === "=") && secondNumber !== "") {
            equalsButton();
        } else if (targetKey === "Delete") {
            clearButton();
        } else if (targetKey === "Backspace") {
            backspaceButton();
        };
        setDecimalActive();
    });
});

//outputs values in console for testing
function outputValues(target) {
    console.log(`Button pressed: ${target}`)
    console.log(`firstNumber = ${firstNumber}`);
    console.log(`secondNumber = ${secondNumber}`);
    console.log(`decimal = ${decimalActive}`);
    console.log(`operator = ${operator}`);
    console.log(`result = ${result}\n \n \n`)
}