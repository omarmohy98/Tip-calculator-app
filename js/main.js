let billInput = document.querySelector(".bill-input");
let personInput = document.querySelector(".person-input");
let staticPersentInputs = document.querySelectorAll(" .input");
let dynamicPersentInput = document.querySelector(".custom");
let resetBtn = document.querySelector(".reset");

function errorMsg(input, msg) {
  input.previousElementSibling.previousElementSibling.innerHTML = `${msg}`;
}

function checkEnteredData(input, value) {
  if (!(Number(value) > 0)) {
    errorMsg(input, input.getAttribute("data-error"));
    input.classList.add("error");
    return false;
  } else {
    errorMsg(input, "");
    input.classList.remove("error");
    return true;
  }
}

function calc(percent) {
  let tipAmoutPerPerson =
    (Number(billInput.value.trim()) * (percent / 100)) /
    Number(personInput.value.trim());
  let personTotalPayAmount =
    tipAmoutPerPerson +
    Number(billInput.value.trim()) / Number(personInput.value.trim());
  return [tipAmoutPerPerson.toFixed(2), personTotalPayAmount.toFixed(2)];
}

function display(result) {
  document.querySelector(".tip-result span").innerHTML = result[0];
  document.querySelector(".total-result span").innerHTML = result[1];
  resetBtn.classList.add("active");
}

staticPersentInputs.forEach((ele) => {
  ele.addEventListener("click", (eve) => {
    checkEnteredData(billInput, billInput.value.trim());
    checkEnteredData(personInput, personInput.value.trim());
    if (
      checkEnteredData(billInput, billInput.value.trim()) &&
      checkEnteredData(personInput, personInput.value.trim())
    ) {
      staticPersentInputs.forEach((ele) => {
        ele.classList.remove("selected");
      });
      eve.target.classList.add("selected");
      let result = calc(
        Number(eve.target.getAttribute("placeholder").slice(0, -1))
      );
      display(result);
    }
  });
});

dynamicPersentInput.addEventListener("blur", (eve) => {
  checkEnteredData(billInput, billInput.value.trim());
  checkEnteredData(personInput, personInput.value.trim());
  if (
    checkEnteredData(billInput, billInput.value.trim()) &&
    checkEnteredData(personInput, personInput.value.trim()) &&
    Number(eve.target.value) >= 0
  ) {
    let result = calc(Number(eve.target.value));
    display(result);
  }
});

resetBtn.addEventListener("click", () => {
  resetBtn.classList.remove("active");
  display(["0.00", "0.00"]);
  billInput.value = "0";
  personInput.value = "0";
  staticPersentInputs.forEach((ele) => {
    ele.classList.remove("selected");
  });
});
