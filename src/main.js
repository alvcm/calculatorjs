const screenText = document.getElementById("screen-text");
const screenInput = document.getElementById("screen-input");

const buttons = document.getElementById("buttons");

let lastDigit = "0";

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