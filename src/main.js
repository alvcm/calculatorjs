const screenText = document.getElementById("screen-text");
const screenInput = document.getElementById("screen-input");

const buttons = document.getElementById("buttons");
const equal = document.getElementById("equal");

let lastDigit = "0";
let operation = [];

buttons.addEventListener("click", (event) => {
    if (event.target.nodeName === "INPUT") {
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
    if (screenText.value !== "") {
        screenText.value = screenText.value + " " + screenInput.value;  
        operation = screenText.value.trim().split(" ");
        screenText.value = screenText.value + " =";  

        const signs = ["*","/", "+", "-"];
        signs.forEach(sign => solveOperation(sign))
        screenInput.value = operation[0];
    }
}

function solveOperation(sign) {
    const index = operation.indexOf(sign);

    if (index === -1) {
        return;
    } else {
        let res =  0;
        const num1 = Number(operation[index - 1]);
        const num2 = Number(operation[index + 1]);
        switch (sign) {
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
        solveOperation(sign)
    }
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

