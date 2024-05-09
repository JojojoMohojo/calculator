let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let five = document.querySelector("#five");
let six = document.querySelector("#six");
let seven = document.querySelector("#seven");
let eight = document.querySelector("#eight");
let nine = document.querySelector("#nine");
let zero = document.querySelector("#zero");
let divi = document.querySelector("#divi");
let mult = document.querySelector("#mult");
let sub = document.querySelector("#sub");
let plus = document.querySelector("#plus");
let equals = document.querySelector("#equals");
let dot = document.querySelector("#dot");
let clear = document.querySelector("#clear");
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

let num1;
let num2;
let operator;

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

function splitMathValue(string) {
    let operators = ["+", "-", "x", "/"]
    let operator;
    let numbers;
    for (let i = 0; i <= operators.length; i++) {
        if (string.includes(operators[i])) {
            numbers = string.split(operators[i]);
            operator = operators[i];
        };
    };
    if (numbers[0] === "0" || numbers[1] === "0") {
        return "Oi you bastard!";
    } else {
        return operate(parseInt(numbers[0]), parseInt(numbers[1]), operator).toFixed(2).toString();
    };
};
let mathValue = "";
let isNumLastPressed = false;
let isOperatorActive = false;
let twoNumActive = false;
display.textContent = "0";

document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (event.target.classList.contains("num") && isNumLastPressed === false) {
                display.textContent = event.target.textContent;
                isNumLastPressed = true;
                mathValue += event.target.textContent;
            } else if (event.target.classList.contains("num") && isNumLastPressed === true) {
                display.textContent += event.target.textContent;
                isNumLastPressed = true;
                mathValue += event.target.textContent;
            } else if (event.target.classList.contains("oper") && isNumLastPressed === true && isOperatorActive === false) {
                isOperatorActive = true;
                isNumLastPressed = false;
                mathValue += event.target.textContent;
            } else if (event.target.classList.contains("oper") && isNumLastPressed === true && twoNumActive === true) {
                display.textContent = splitMathValue(mathValue);
                mathValue = splitMathValue(mathValue) + event.target.textContent;
                isNumLastPressed = false;
            } else if (event.target.id === "equals" && isNumLastPressed === true && twoNumActive === true) {
                mathValue = splitMathValue(mathValue);
                display.textContent = mathValue;
                isNumLastPressed = true;
                isOperatorActive = false;
                twoNumActive = false;

                if (/\d/.test(mathValue) === false) {
                    mathValue = "";
                    isNumLastPressed = false;
                };
            }
            if (event.target.classList.contains("num") && isOperatorActive === true) {
                twoNumActive = true;
            }

            if (event.target.id === "clear") {
                mathValue = "";
                isNumLastPressed = false;
                isOperatorActive = false;
                twoNumActive = false;
                display.textContent = "0";
            }

            console.log(`Button pressed: ${event.target.textContent}`)
            console.log(`mathValue = ${mathValue}`);
            console.log(`isNumLastPressed = ${isNumLastPressed}`);
            console.log(`isOperatorActive = ${isOperatorActive}`);
            console.log(`twoNumActive = ${twoNumActive}`);
        });
    });
});

