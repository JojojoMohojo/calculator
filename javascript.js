let display = document.querySelector(".display");

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

function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
};

function resetCalc() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    result = undefined;
    decimalActive = false;
};

display.textContent = "0";
let firstNumber = "";
let secondNumber = "";
let operator = "";
let result;
let decimalActive = false;

document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {

            if (event.target.classList.contains("num")) {
                if (operator === "") {
                    if (firstNumber === "" || result !== undefined) {
                        firstNumber = event.target.textContent;
                        display.textContent = event.target.textContent;
                        
                    } else {
                        firstNumber += event.target.textContent;
                        display.textContent += event.target.textContent;
                    };
                } else {
                    if (secondNumber === "") {
                        secondNumber = event.target.textContent;
                        display.textContent = event.target.textContent;
                    } else {
                        secondNumber += event.target.textContent;
                        display.textContent += event.target.textContent;
                    };
                };
                result = undefined;
            } else if (event.target.id === "dot" && decimalActive === false && result === undefined) {
                if (firstNumber !== "" && secondNumber === "") {
                    firstNumber += event.target.textContent;
                    display.textContent += event.target.textContent;
                } else if (secondNumber !== "") {
                    secondNumber += event.target.textContent;
                    display.textContent += event.target.textContent;
                };
                decimalActive === true;
            } else if (event.target.classList.contains("oper")) {
                if (firstNumber !== "") {
                    if (operator !== "" && secondNumber !== "") {
                        if (secondNumber === "0") {
                            display.textContent = "Oi cheeky cunt";
                            resetCalc();
                        } else {
                            result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
                            display.textContent = roundToTwoDecimals(result).toString();
                            operator = event.target.textContent;
                            firstNumber = result;
                            secondNumber = "";
                        };
                    } else if (operator === "") {
                        operator = event.target.textContent;
                    };
                };
            } else if (event.target.id === "equals" && secondNumber !== "") {
                if (secondNumber === "0") {
                    display.textContent = "Oi cheeky cunt";
                    resetCalc();
                } else {
                    result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
                    display.textContent = roundToTwoDecimals(result).toString();
                    firstNumber = result;
                    operator = "";
                    secondNumber = "";
                };      
            } else if (event.target.id === "clear") {
                resetCalc();
                display.textContent = "0";
            };

            console.log(`Button pressed: ${event.target.textContent}`)
            console.log(`firstNumber = ${firstNumber}`);
            console.log(`secondNumber = ${secondNumber}`);
            console.log(`decimal = ${decimalActive}`);
            console.log(`operator = ${operator}`);
            console.log(`result = ${result}\n \n \n`);
        });
    });
});

