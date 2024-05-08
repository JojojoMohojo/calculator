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
let displayValue;
document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("button");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (event.target.id !== "dot" && event.target.id !== "equals" && event.target.id !== "clear") {
                display.textContent = display.textContent + event.target.textContent;
                displayValue = display.textContent;
            }
        });
    });
});