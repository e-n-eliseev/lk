//скрипт открывающий окно с информацией о содержании продукта

//определяем переменные
const popUpBtn = document.querySelectorAll(".options__button");
const popUpWindow = document.querySelectorAll(".options__pop-up");
//назначаем обработчик события клика по кнопке
for (let i = 0; i < popUpBtn.length; i++) {
    popUpBtn[i].addEventListener("click", (event) => {
        popUpWindow[i].classList.toggle("open");
        event.stopPropagation();
    })
}
//назначаем обработчик события обьекту windows для закрытия окна
window.addEventListener("click", () => {
    for (let i = 0; i < popUpWindow.length; i++) {
        if (popUpWindow[i].classList.contains("open")) {
            popUpWindow[i].classList.remove("open");
        }
    }
})







