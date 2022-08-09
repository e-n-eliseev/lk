const item = document.querySelector(".sticky-body");
const btn = document.querySelector(".sticky__btn");
const btnBody = document.querySelector(".sticky-body__btn");

//описываем опции наблюдателя
const options = {
    threshold: 0
}
//колбэк наблюдателя
const show = (element) => {
    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.pointerEvents = "all";
}
const hide = (element) => {
    element.style.opacity = "0";
    element.style.visibility = "hidden";
    element.style.pointerEvents = "none";
}
const callback1 = () => {
    if (item.style.opacity === "0") {
        show(item);
        show(btn);
    } else {
        hide(item);
        hide(btn);
    }
}
const callback2 = () => {

    if (window.screen.width < 830) {
        if (item.style.opacity === "0") {
            show(item);
            show(btn);
        } else {
            hide(item);
            hide(btn);
        }
    }
}

//создаем наблюдатель
let observer1 = new IntersectionObserver(callback1, options);
let observer2 = new IntersectionObserver(callback2, options);
//наблюдаемый обьект
const target1 = document.querySelector('.buy');
const target2 = document.querySelector('.bottom');
observer1.observe(target1);
observer2.observe(target2);

//определяем переменные
const discount = document.querySelector(".sticky-body__discount");
const product = document.querySelector(".sticky-body__product");
const divider = document.querySelector(".sticky-body__divider");
const conditions = document.querySelector(".sticky-body__conditions");
const priceArea = document.querySelector(".sticky-body__price");
const renewal = document.querySelector(".sticky-body__renewal");
const cover = document.querySelector(".cover");
const body = document.body;
//создаем обработчик клика на кнопку стики блока
btn.addEventListener("click", () => {
    const icon = document.querySelector(".sticky__btn-icon");
    icon.classList.toggle("open");
    if (icon.classList.contains("open")) {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        discount.style.display = "flex";
        product.style.display = "flex";
        divider.style.display = "block";
        conditions.style.display = "flex";
        priceArea.style.display = "flex";
        renewal.style.display = "flex";
        item.style.padding = "16px";
        btnBody.style.width = "264px";
        btnBody.style.minHeight = "64px";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.paddingRight = "22px";
        body.style.top = `-${scrollY}`;
        cover.style.display = "block";
    } else {
        const scrollY = body.style.top;
        discount.style.display = "none";
        product.style.display = "none";
        divider.style.display = "none";
        conditions.style.display = "none";
        priceArea.style.display = "none";
        renewal.style.display = "none";
        item.style.padding = "0";
        btnBody.style.width = "312px";
        btnBody.style.minHeight = "40px";
        body.style.overflow = "auto";
        body.style.position = "";
        body.style.top = ``;
        body.style.paddingRight = "0";
        cover.style.display = "none";
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

})

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});
