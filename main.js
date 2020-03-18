'use strict'

//получаем инпуты и списки
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities--to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');


//массив возможных городов
const city = ["Киев", "Москва", "Минск", "Санкт-Петербург", "Челябинск",
"Керч", "Волгоград", "Самара", "Днепр", "Екатеринбург", "Одесса",
"Ухань", "Тбилиси", "Кайсери", "Вроцлав", "Ростов-на-Дону"];

//функция для илюстрации выпадающего списка городов
const showCity = (input, list) => {
    //каждый раз очищаем выпадающий список
    list.textContent = '';

    //если инпут пуст прекращаем работу функции
    if(input.value === ''){
        return;
    };
    
    //создаем массив из городов в массиве city которые включают в
    //себя введеный в инпут текст
    const filterCity = city.filter((item) => {
        const fixItem = item.toLowerCase();
        return fixItem.includes(input.value.toLowerCase());
    });
    
    //создаем елемент выпадающего списка для каждого елемента массива filterCity
    filterCity.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('dropdowm__city');
        li.textContent = item;
        list.append(li);
    });
}

//функция "живого поиска" по городам
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});