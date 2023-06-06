const operations = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  "*": function (a, b) {
    return a * b;
  },
  "/": function (a, b) {
    return a / b;
  },
};

const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalButton = document.querySelector(".button__equal");
const screen = document.querySelector(".screen p");

const onNumberPressed = function (event) {
  if (screen.textContent === "0") {
    screen.textContent = "";
  }
  screen.textContent += event.target.textContent;
};

numberButtons.forEach((button) => {
  button.addEventListener("click", onNumberPressed);
});

const onOperationPressed = function (event) {
  if (Object.keys(operations).includes(screen.textContent.slice(-1))) {
    screen.textContent = screen.textContent.slice(0, -1);
  }
  screen.textContent += event.target.textContent;
};

operationButtons.forEach((button) => {
  button.addEventListener("click", onOperationPressed);
});

document
  .querySelector(".button__clean")
  .addEventListener("click", () => (screen.textContent = "0"));

equalButton.addEventListener("click", function () {
  screen.textContent = calculate(
    screen.textContent.split(/([\+\-\*\/])/)
  ).toString();
});

function calculate(expression) {
  let numberStack = [];
  let operatorStack = [];

  for (let i = 0; i < expression.length; i++) {
    let token = expression[i];
    if (operations[token]) {
      while (
        operatorStack.length > 0 &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        applyOperation();
      }
      operatorStack.push(token);
    } else {
      numberStack.push(Number(token));
    }
  }

  while (operatorStack.length > 0) {
    applyOperation();
  }

  function applyOperation() {
    let operator = operatorStack.pop();
    let number2 = numberStack.pop();
    let number1 = numberStack.pop();
    numberStack.push(operations[operator](number1, number2));
  }

  return numberStack[0];
}
