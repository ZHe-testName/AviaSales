'use strict'

//получаем инпуты и списки
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart');


//массив возможных городов
let city = [];

//const cityesApi = 'http://api.travelpayouts.com/data/ru/cities.json';

const cityesApi = 'data base/cityes.json';

const proxy = 'https://cors-anywhere.herokuapp.com/';

const API_KEY = 'fe97c4abc71297b7ea093a47d516bdfb';

const CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';

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
            const fixItem = item.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
    });
    
    //создаем елемент выпадающего списка для каждого елемента массива filterCity
    filterCity.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('dropdowm__city');
        li.textContent = item.name;
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

//функция обращения к базе данных городов
//на сервере
const getData = (url, callback) => {
    //создаем обект запроса
    const request = new XMLHttpRequest();

    request.open('GET', url);

    //слушатель когда прийдет ответ с сервера
    //4-ка означает что ответ пришел
    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4){
            return;
        }

        //статус 200 означает что все хорошо
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



getData(cityesApi, (data) => {
    city = JSON.parse(data).filter(item => item.name);

    /*тоже самое что
      city = JSON.parse(data).filter((item) => {
          if(item.name === true){
              return true;
          }
          );
    
    */
})