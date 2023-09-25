// const loadHTMLContent = (url) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url);
//   xhr.onload = function () {
//     if (xhr.status === 200 && xhr.readyState === 4) {
//       console.log(xhr.response);
//     }
//   };
//   xhr.send();
// };
// loadHTMLContent("/html/step2.html");
const target = document.querySelector(".picks__container");
const nextBtn = document.querySelector(".next__step-btn");
const btns = document.querySelectorAll(".step__num");

const activeBtn = {
  id: 1,
  isActive: true,
};
for (const btn of btns) {
  btn.addEventListener("click", () => {
    //удаляем класс у всех кнопок
    for (const button of btns) {
      button.classList.remove("active");
    }
    //а тут наоборот, добавляем =)
    btn.classList.add("active");
    activeBtn.id = btn.textContent;
    activeBtn.isActive = true;
    //Показываем формочку новую

    //fix
    activeBtn.id == 1
      ? loadHTMLContent(`/html/index.html`)
      : loadHTMLContent(`/html/step${activeBtn.id}.html`);
  });
}
const showMainPage = async () => {
  const fetching = await fetch("/html/index.html")
    .then((response) => response.text())
    .then((data) => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = data;
      const container = tempContainer.querySelector("");
    });
};
const loadHTMLContent = async (url) => {
  const fetching = await fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = data.querySelector(
        ".personal__info-inputs"
      ).innerHTML;

      //что хотим вставить
      const plans = tempContainer.querySelector(".right__block").innerHTML; //edit
      console.log(plans);
      target.innerHTML = plans;
      console.log(target);
    })
    .catch((e) => console.log(e));
};
// loadHTMLContent2("/html/step2.html");
