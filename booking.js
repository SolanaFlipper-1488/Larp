const urlParams = new URLSearchParams(window.location.search);
const titleParam = urlParams.get("title");
const priceParam = urlParams.get("price");

if (titleParam) {
  document.getElementById("display-title").textContent = `“${titleParam}”`;
}
if (priceParam) {
  document.getElementById("display-price").textContent = priceParam;
}

const form = document.getElementById("bookingForm");
const phoneInput = document.getElementById("user-phone");
const dateSelect = document.getElementById("tour-date");
const displayDate = document.getElementById("display-date");

phoneInput.addEventListener("input", function () {
  phoneInput.classList.remove("input-error");

  let input = this.value.replace(/\D/g, "");

  if (input === "") {
    this.value = "";
    return;
  }

  if (input[0] === "7" || input[0] === "8") {
    input = input.substring(1);
  }

  input = input.substring(0, 10);

  let formattedValue = "+7";

  if (input.length > 0) {
    formattedValue += " (" + input.substring(0, 3);
  }
  if (input.length >= 4) {
    formattedValue += ") " + input.substring(3, 6);
  }
  if (input.length >= 7) {
    formattedValue += "-" + input.substring(6, 8);
  }
  if (input.length >= 9) {
    formattedValue += "-" + input.substring(8, 10);
  }

  this.value = formattedValue;
});

dateSelect.addEventListener("change", function () {
  if (this.value !== "") {
    const selectedText = this.options[this.selectedIndex].text;
    displayDate.textContent = selectedText;
  } else {
    displayDate.textContent = "Не выбрана";
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("user-name");
  const surnameInput = document.getElementById("user-surname");
  const emailInput = document.getElementById("user-email");

  const digitsOnly = phoneInput.value.replace(/\D/g, "");

  const isPhoneValid = digitsOnly.length === 11;
  const isNameValid = nameInput.value.trim() !== "";
  const isSurnameValid = surnameInput.value.trim() !== "";
  const isEmailValid = emailInput.value.includes("@");
  const isDateValid = dateSelect.value !== "";

  if (!isPhoneValid) {
    phoneInput.classList.add("input-error");
    phoneInput.focus();
  }

  if (
    !isPhoneValid ||
    !isNameValid ||
    !isSurnameValid ||
    !isEmailValid ||
    !isDateValid
  ) {
    return;
  }

  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  const fakeOrderNumber = `${randomNum}-у/д`;

  const selectedDateText = dateSelect.options[dateSelect.selectedIndex].text;

  const finalTitle = titleParam || "Горное озеро";
  const finalPrice = priceParam || "15 000 р";

  window.location.href = `success.html?id=${fakeOrderNumber}&title=${encodeURIComponent(finalTitle)}&price=${encodeURIComponent(finalPrice)}&date=${encodeURIComponent(selectedDateText)}`;
});
