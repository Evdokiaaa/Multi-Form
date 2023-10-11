const btns = document.querySelectorAll(".step__num");

const prices = {
  totalPrice: 0,
  planPrice: 0,
  additionsPrice: [], //Тут будут объекты
};

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
  const response = await fetch("/html/index.html");
  const data = await response.text();
  const fetching = await fetch()
    .then((response) => response.text())
    .then((data) => {
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = data;
      const container = tempContainer.querySelector("");
    });
};

//!ЗАГРУЗКА КОНТЕНТА СТРАНИЦ
const loadHTMLContent = async (url) => {
  if (url.includes("index")) {
    //TODO Возможно изменить в будущем
    const response = await fetch(url); //* Получили промис тут

    const data = await response.text(); //* Код страницы
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = data;
    //3.2 Положили, теперь собираем данные ( во всех файлах обернуть в этот блок )
    return tempContainer.querySelector(".right__block").innerHTML;
  }
  //1. Получаем наш файл
  const response = await fetch(url); //* Получили промис тут
  //2. Мы получили какой-та ответ. надо его обработать
  const data = await response.text(); //* Код страницы
  //3. Все ок, теперь надо получить контент body ( и положить в ДОМ )
  //3.1 Создали временный контейнер, куда положим эту биг строку
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = data;
  //3.2 Положили, теперь собираем данные ( во всех файлах обернуть в этот блок )
  return tempContainer.querySelector(".right__block").innerHTML;
};
//*Теперь должны заменить наш актуальный блок на новый

const changeBlock = (block) => {
  const target = document.querySelector(".picks__container");
  target.innerHTML = block; //*target ->наша главная страничка
  //* Получаем новую кнопку на странице и вешаем на нее слушатель нажатия
  const nextBtn = document.querySelector(".next__step-btn");
  const previousBtn = document.querySelector(".back__step-btn");
  if (nextBtn) nextBtn.addEventListener("click", nextStepClickHandler);
  //TODO Тоже изменить
  if (previousBtn)
    previousBtn.addEventListener("click", previousStepClickHandler);
};

let counter = 1;
const nextStepClickHandler = async () => {
  counter++;
  if (counter > 4) {
    counter = 1; // Сбрасываем counter, если он превышает максимальное значение
  }
  const htmlContent = await loadHTMLContent(`/html/step${counter}.html`);
  changeBlock(htmlContent);
  checkPage(counter);
};
const previousStepClickHandler = async () => {
  counter--;
  if (counter <= 1) {
    counter = 1;
    const htmlContent = await loadHTMLContent(`/html/index.html`);
    changeBlock(htmlContent);
    checkPage(counter);
    return;
  }

  //TODO  //TODO Тоже изменить

  const htmlContent = await loadHTMLContent(`/html/step${counter}.html`);
  changeBlock(htmlContent);
  checkPage(counter);
};

const nextBtn = document.querySelector(".next__step-btn");
nextBtn.addEventListener("click", nextStepClickHandler);
//TODO

//*1. Сделать работу с confirm кнопкой. ( FIXED BUT NEED FORM)
//*2. Когда форму заполнили, мы должны закраживать кружок цветом, убрать клики по ним
//*3. Пагинация
//*4. Делать не git add ., а git add *file*
//! Plands

function checkPage(counter) {
  //   console.log(counter);
  switch (counter) {
    case 1:
      console.log("main page");
      break;
    case 2:
      console.log("SECOND PAGE");
      selectPlan();
      break;
    case 3:
      console.log("third PAGE");
      selectOdds();
      break;
    case 4:
      console.log("FOUR PAGE");
      getSummary();
      break;
  }
}
function selectPlan() {
  const plans = document.querySelectorAll(".plan");
  const planPrices = document.querySelectorAll(".plan__price");
  let activePlan = null;
  const price = Array.from(planPrices).map((el) =>
    parseInt(el.textContent.replace(/[^0-9]/g, ""))
  );
  plans.forEach((plan, i) =>
    plan.addEventListener("click", () => {
      if (activePlan) {
        // Убераем активным элемент
        activePlan.style.border = "1px solid hsl(231, 11%, 63%)";
      }

      if (prices.planPrice) {
        prices.planPrice = 0;
      }
      prices.planPrice += price[i];
      //* Делаем план активным
      plan.style.border = "2px solid #5D3FD3";
      activePlan = plan;
    })
  );
  //TODO ДОБАВИТЬ MONTLY/YEAR ШТУКУ
}
function selectOdds() {
  const odd = document.querySelectorAll(".adds__checkbox");
  const pricesElement = document.querySelectorAll(".add__price");

  //TODO Можно price вынести в отдельный файл )
  const price = Array.from(pricesElement).map((el) =>
    parseInt(el.textContent.replace(/[^0-9]/g, ""))
  );
  const title = document.querySelectorAll(".add__title");

  odd.forEach((input, i) => {
    input.addEventListener("click", () => {
      console.log("input clicked", i);
      //* edit in future. works great rn ( Когда переходим на некс страницу можно состояение прошлое оставлять галки)
      if (input.checked) {
        //! IMPORTANT
        prices.additionsPrice.push({
          price: 0 + price[i],
          type: title[i].textContent,
        });

        //item.type = title[i].textContent;
        console.log(prices);
      }
      //* was prices.additionsPrice += price[i];

      if (!input.checked) {
        //* WAS prices.additionsPrice -= price[i];
        prices.additionsPrice.splice(i, 1);
        console.log(prices);
      }
    });
  });
}

function checkFinish() {
  //! maybe change later for finish__price
  const arcadePrice = document.querySelector(".finish__plan-price");

  //*Тут должны создавать блок из выбранных элементов
  // const addsOnPrices = document.c;
}
function getSummary() {
  const total = document.querySelector(".total__price ");
  createFinishAddition();
  //const planPrice = document.querySelector(".");
  //! FIX LATER
  let additionPriceTotal = 0;
  for (let item of prices.additionsPrice) {
    additionPriceTotal += item.price;
  }

  prices.totalPrice = additionPriceTotal + prices.planPrice;
  total.textContent = `${prices.totalPrice}/mo`;

  //console.log(prices.totalPrice);
}

function createFinishAddition() {
  prices.additionsPrice.forEach((extra) => {
    console.log(extra.price); //Получаем цену
    const finish = document.querySelector(".finish");
    const mainInfo = document.createElement("div");
    const mainInfoContainer = document.createElement("div");
    const mainInfoTitle = document.createElement("p");
    const mainInfoPrice = document.createElement("p");
    const className = extra.type.toLowerCase().replace(" ", "_");
    mainInfo.classList.add(className);
    mainInfoContainer.classList.add(className + "-container");
    mainInfoContainer.classList.add("flex");
    mainInfoTitle.classList.add(className + "-title");
    mainInfoTitle.textContent = extra.type;
    mainInfoPrice.classList.add(className + "-price");

    mainInfoPrice.textContent = `$${extra.price}/mo`; //! FIX LATER FOR YEAR
    mainInfoContainer.appendChild(mainInfoTitle);
    mainInfoContainer.appendChild(mainInfoPrice);
    mainInfo.appendChild(mainInfoContainer);
    finish.appendChild(mainInfo);
  });

  
}
//TODO Пофиксить баги, декомпозиция, назвать переменные нормально, улучшить код, пофиксить баги  в верстке. 
//TODO Вместо ARCADE, на финальной странице, показывать ту карточку, которую выбрали 