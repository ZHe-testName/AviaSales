'use strict'

//получаем инпуты и списки
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');


//массив возможных городов
const city = ["Киев", "Москва", "Минск", "Санкт-Петербург", "Челябинск",
"Керч", "Волгоград", "Самара", "Днепр", "Екатеринбург", "Одесса",
"Ухань", "Тбилиси", "Кайсери", "Вроцлав", "Ростов-на-Дону"];

//const cityesApi = 'http://api.travelpayouts.com/data/ru/cities.json';

const cityesApi = 'data base/cityes.json';

const proxy = 'https://cors-anywhere.herokuapp.com/';

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
};

//функция для обработки клика по городу из списка
const hendlerCity = (event, input, list) => {
    const target = event.target;
    if(target.tagName.toLowerCase() === 'li'){
        input.value = target.textContent;
        list.textContent = '';
    };
};

const getData = (url, callback) => {
    //создаем обект запроса
    const request = new XMLHttpRequest();

    request.open('GET', url);

    //слушатель когда прийдет ответ с сервера
    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4){
            return;
        }

        if(request.status === 200){
            callback(request.response)
        }else{
            console.error(request.status)
        }
    });

    request.send();
}



//функция "живого поиска" по городам "из"
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});


//функция обработки на клик ))по елементу списка "из"
dropdownCitiesFrom.addEventListener('click', (event) => {
    hendlerCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

//функция "живого поиска" по городам "в"
inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

//функция обработки на клик ))по елементу списка "в"
dropdownCitiesTo.addEventListener('click', (event) => {
        hendlerCity(event, inputCitiesTo, dropdownCitiesTo);
});

//getData('https://jsonplaceholder.typicode.com/todos/1');

getData(cityesApi, (data) => {
    console.log(data);
})