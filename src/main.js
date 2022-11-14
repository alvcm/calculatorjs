const screenText = document.getElementById("screen-text");
const screenInput = document.getElementById("screen-input");

const buttons = document.getElementById("buttons");
const equal = document.getElementById("equal");
const del = document.getElementById("delete");
const clear = document.getElementById("clear");

let lastDigit = "0";
let operation = [];

let sign = false;

buttons.addEventListener("click", (event) => {
    
    if (event.target.nodeName === "INPUT") {
        if (sign) {
            clearScreen();
        }
        
        const btnValue = event.target.value;

        if (btnValue.match(/[0-9\.]/)) {
            if (btnValue.match(/\./) && lastDigit.match(/\./)) {
                screenInput.value = screenInput.value.replace(/.$/, btnValue);
            } else {
                if (screenInput.value == 0 || lastDigit.match(/[\+\-\/\*]/)) {
                    screenInput.value = btnValue;
                } else {
                    screenInput.value += btnValue;  
                }
            }
        }

        if (btnValue.match(/[\+\-\/\*]/)) {
            if (lastDigit.match(/[\+\-\/\*]/)) {
                screenText.value = screenText.value.replace(/.$/, btnValue);
            } else {
                screenText.value = screenText.value + " " + screenInput.value + " " + btnValue;  
            }   
        }

        lastDigit = event.target.value;
    }
});

equal.onclick = generateOperation;

function generateOperation() {
    if (screenText.value !== ""  && !sign) {
        screenText.value = screenText.value + " " + screenInput.value;  
        operation = screenText.value.trim().split(" ");
        screenText.value = screenText.value + " =";  

        const operators = ["*","/", "+", "-"];
        operators.forEach(operator => solveOperation(operator))
        screenInput.value = operation[0];
        sign = true;
    }
}

function solveOperation(operator) {
    const index = operation.indexOf(operator);

    if (index === -1) {
        return;
    } else {
        let res =  0;
        const num1 = Number(operation[index - 1]);
        const num2 = Number(operation[index + 1]);
        switch (operator) {
            case "+":
                res = add(num1, num2);
                operation[index-1] = res;
                operation.splice(index,2)
                break;
            case "-":
                res = sub(num1, num2);
                operation[index-1] = res;
                operation.splice(index,2)
                break;

            case "*":
                res = multiply(num1, num2);
                operation[index-1] = res;
                operation.splice(index,2)
                break;

            case "/":
                res = divide(num1, num2);
                operation[index-1] = res;
                operation.splice(index,2)
                break;
        
            default:
                break;
        }
        solveOperation(operator)
    }
}

del.onclick = deleteNumber;
clear.onclick = clearScreen;

function deleteNumber() {
    if (sign) {
        screenText.value = "";
    } else {
        if (screenInput.value.length > 1) {
            screenInput.value = screenInput.value.slice(0, -1);
        } else {
            screenInput.value = 0;
        }
    }
}

function clearScreen() {
    screenInput.value = 0;
    screenText.value = "";
    sign = false;
}

//operations
function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

