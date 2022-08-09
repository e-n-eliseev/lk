//скрипт работы с выпадающим списком и калькуляции итоговой цены

//инициализируем переменные
const basePrice = 5000;
let price;

//функция подсчитывающая цену заказа и вставляющая его в разметку
const count = (discount, tag) => {
    const priceUnit = document.querySelector(`${tag}__price-base-number`);
    const discountPriceUnit = document.querySelector(`${tag}__price-discount-number`);
    const usersQuantity = document.querySelector(`${tag}__users-trigger span`);
    const yearsQuantity = document.querySelector(`${tag}__years-trigger span`);

    price = basePrice * usersQuantity.dataset.value * yearsQuantity.dataset.value;
    //проверяем длину числа, уменьшаем шриф при необходимости
    if (price.toString().length >= 6) {
        discountPriceUnit.classList.add(`${tag.slice(1)}__price-discount-number--small`);
    } else {
        discountPriceUnit.classList.remove(`${tag.slice(1)}__price-discount-number--small`);
    }
    priceUnit.textContent = `${price.toLocaleString("eu", {
        style: "currency",
        currency: "EUR"
    })
        }`;
    discountPriceUnit.textContent = `${(price * (1 - discount)).toLocaleString("eu", {
        style: "currency",
        currency: "EUR"
    })} `

}
count(0.25, ".buy");
count(0.25, ".sticky-body");


//функция обработчик, отвечающий за разворачивание списков
const dropDown = (current) => {
    document.querySelector(`${current}-trigger`).addEventListener('click', () => {
        if (current === ".buy__users" || current === ".sticky-body__users") {
            const userMenu = document.querySelector(`${current}-select`);
            userMenu.style.zIndex === "2"
                ? userMenu.style.zIndex = "1"
                : userMenu.style.zIndex = "2";
        }
        document.querySelector(`${current}-select`).classList.toggle('open');
        document.querySelector(`${current}-arrow`).classList.toggle('open');
    })
}
dropDown(".buy__users");
dropDown(".buy__years");
dropDown(".sticky-body__users");
dropDown(".sticky-body__years");

//обработчики, отвечающие за выбор и запоминание значения

const storeValue = (current, suffix) => {
    const arr = document.querySelectorAll(`${current}-option`);
    for (const option of arr) {
        option.addEventListener('click', () => {
            if (!option.classList.contains('selected')) {

                const trigger = option.closest(`${current}-select`).querySelector(`${current}-trigger span`);

                option.parentNode.querySelector(`${current}-option.selected`).classList.remove('selected');
                option.classList.add('selected');
                trigger.textContent = option.textContent;
                trigger.dataset.value = option.dataset.value;
                count(0.25, suffix);
            }
        })
    }
}

storeValue(".buy__users", ".buy");
storeValue(".buy__years", ".buy");
storeValue(".sticky-body__users", ".sticky-body");
storeValue(".sticky-body__years", ".sticky-body");

//обработчик закрывающий списки при клике на любую область экрана
const remove = (current) => {
    document.querySelector(`${current}-select`).classList.remove('open');
    document.querySelector(`${current}-arrow`).classList.remove('open');
}
const check = (current, event) => {
    const userMenu = document.querySelector(`${current}-select`);
    if (!userMenu.contains(event.target)) {
        if (current === ".buy__users" || current === ".sticky-body__users") {
            userMenu.style.zIndex = "1";
        }
        remove(current);
    }
}

window.addEventListener('click', (event) => {
    check(".buy__users", event);
    check(".buy__years", event);
    check(".sticky-body__users", event);
    check(".sticky-body__years", event);
});