const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianNumber(str) {
  return str.toString().replace(/\d/g, (d) => persianDigits[d]);
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".persian-num").forEach((el) => {
    el.textContent = toPersianNumber(el.textContent);
  });
});
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".persian-num").forEach((el) => {
    el.textContent = toPersianNumber(el.textContent);
  });
});
