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
    const response = await fetch("/html/index.html")
    const data =  await  response.text()
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
    if (url.includes('index')){ //TODO Возможно изменить в будущем
        const response = await fetch(url) //* Получили промис тут

        const data = await response.text() //* Код страницы
        const tempContainer = document.createElement('div')
        tempContainer.innerHTML = data;
        //3.2 Положили, теперь собираем данные ( во всех файлах обернуть в этот блок )
        return tempContainer.querySelector('.right__block').innerHTML;
    }
    //1. Получаем наш файл
    const response = await fetch(url) //* Получили промис тут
    //2. Мы получили какой-та ответ. надо его обработать
    const data = await response.text() //* Код страницы
    //3. Все ок, теперь надо получить контент body ( и положить в ДОМ )
    //3.1 Создали временный контейнер, куда положим эту биг строку
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = data;
    //3.2 Положили, теперь собираем данные ( во всех файлах обернуть в этот блок )
    return tempContainer.querySelector('.right__block').innerHTML;

}
//*Теперь должны заменить наш актуальный блок на новый

const changeBlock = (block) => {
    const target = document.querySelector(".picks__container");
    target.innerHTML = block  //*target ->наша главная страничка
    //* Получаем новую кнопку на странице и вешаем на нее слушатель нажатия
    const nextBtn = document.querySelector('.next__step-btn')
    const previousBtn = document.querySelector('.back__step-btn')
    nextBtn.addEventListener('click', nextStepClickHandler)
    //TODO Тоже изменить
    if(previousBtn)  previousBtn.addEventListener('click',previousStepClickHandler)


}

let counter = 1
const nextStepClickHandler = async () => {
    counter++
    if (counter > 4) {
        counter = 1; // Сбрасываем counter, если он превышает максимальное значение
    }
    const htmlContent = await loadHTMLContent(`/html/step${counter}.html`)
    changeBlock(htmlContent)

}
const previousStepClickHandler = async () =>{
    counter--;
    if(counter <= 1){
        counter = 1
        //TODO  //TODO Тоже изменить
        const htmlContent = await loadHTMLContent(`/html/index.html`)
        changeBlock(htmlContent)
        return
    }
    const htmlContent = await loadHTMLContent(`/html/step${counter}.html`)
    changeBlock(htmlContent)
}
const nextBtn = document.querySelector('.next__step-btn');
nextBtn.addEventListener('click', nextStepClickHandler);
//TODO

//*1. Сделать работу с confirm кнопкой.
//*2. Когда форму заполнили, мы должны закраживать кружок цветом, убрать клики по ним
//*3. Пагинация

