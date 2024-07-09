const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const symbols = ["I", "V", "X", "L", "C", "D", "M"];
const symbolValues = [1, 5, 10, 50, 100, 500, 1000];

const multiplierValues = [1, 10, 100, 1000];
const correspondingValues = ["I", "X", "C", "M"];
const correspondingMiddles = ["V", "L", "D"];

const decimalToRoman = (a, multiplier) => {
    if (a === 0) return "";

    const digit = a % 10;
    const input = Math.floor(a / 10); // Avoid redefining `input`

    const index1 = symbolValues.findIndex(value => value === digit*multiplier);

    if (index1 !== -1) return decimalToRoman(input, multiplier * 10) + symbols[index1];

    const index = multiplierValues.findIndex(value => value === multiplier);
    const values = correspondingValues[index];
    const middleValues = correspondingMiddles[index];
    const fun = decimalToRoman(input, multiplier * 10);
    
    switch (digit) {
        case 2:
        case 3:
        return fun + values.repeat(digit);
        
        case 4:
        return fun + values + middleValues;
        
        case 6:
        case 7:
        case 8:
        return fun + middleValues + values.repeat(digit - 5);
        
        case 9:
        return fun + values + correspondingValues[index + 1];
        
        default:
        return fun;
    }
};

const checkUserInput = () => {
  const inputInt = parseInt(number.value);

  if (!number.value) {
    output.textContent = "Please enter a valid number";
    return;
  }

  if (inputInt < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  if (inputInt >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }

  output.textContent = decimalToRoman(inputInt, 1);
  number.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

number.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
