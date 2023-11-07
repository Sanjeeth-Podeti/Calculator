const buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");
let operand1 = null;
let operator = null;
display.textContent = "";

function calculate() {
  const value = this.getAttribute("data-value");

  if (!isNaN(value) || value === ".") {
    // If the clicked button is a number or a decimal point
    display.textContent += value;
  } else if (value === "+/-") {
    // Toggle the sign of the current number
    display.textContent = parseFloat(display.textContent) * -1;
  } else if (value === "AC") {
    // Clear the display and reset the calculator
    display.textContent = "";
    operand1 = null;
    operator = null;
  } else if (value === "%") {
    // Calculate the percentage of the current number
    display.textContent = parseFloat(display.textContent) / 100;
  } else if (value === "=") {
    if (operand1 !== null && operator !== null) {
      // Perform the calculation when the equals button is pressed
      const operand2 = parseFloat(display.textContent);
      switch (operator) {
        case "+":
          display.textContent = operand1 + operand2;
          break;
        case "-":
          display.textContent = operand1 - operand2;
          break;
        case "*":
          display.textContent = operand1 * operand2;
          break;
        case "/":
          if (operand2 === 0) {
            display.textContent = "Error";
          } else {
            display.textContent = operand1 / operand2;
          }
          break;
        default:
          break;
      }
      operand1 = null;
      operator = null;
    }
  } else if (["+", "-", "*", "/"].includes(value)) {
    // Set the operator when an operator button is clicked
    if (operand1 === null) {
      operand1 = parseFloat(display.textContent);
      operator = value;
      display.textContent = "";
    } else {
      // Handle consecutive operator presses (e.g., 5 + + 3)
      operator = value;
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", calculate);
});
