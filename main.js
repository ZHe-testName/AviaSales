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

const CITIES_API = 'data base/cityes.json';

const PROXY = 'https://cors-anywhere.herokuapp.com/';

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
};

//функция обращения к API авиакомпании на наличие билетов
const getPrice = (url, callback) => {
    const requestToPrice = new XMLHttpRequest();

    requestToPrice.open('GET', url);

    requestToPrice.addEventListener('readystatechange', () => {
        if(requestToPrice.readyState !== 4){
            return;
        };

        if(requestToPrice.status === 200){
            callback(requestToPrice.response);
        }else{
            console.error(requestToPrice.status);
        };
    });

    requestToPrice.send();

};

const renderCheapDay = (cheapTick) => {
    console.log(cheapTick);
};

const renderCheapYear = (cheapTickS) => {
    console.log(cheapTickS);
};

//фнкция для определения списка подходящих билетов и 
//билета на нашу дату
const renderCheap = (data, when) => {
    const cheapTicket = JSON.parse(data).best_prices;
    const cheapTicketDay = cheapTicket.filter(item => item.depart_date === when);
    
    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicket);
};



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

//функция обработки отправки данных
formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = {
        from: city.find(item => inputCitiesFrom.value === item.name).code,
        to: city.find(item => inputCitiesTo.value === item.name).code,
        when: inputDateDepart.value,
    };

    /*
    const reqestData = '?depart_date=' + formData.when +
    '&origin=' + formData.from +
    '&destination=' + formData.to +
    '&token=' + API_KEY;
    */

//или с помощю интерполяции
    const reqestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&token=${API_KEY}`;

    getData(CALENDAR + reqestData, (response) => {
        renderCheap(response, formData.when);
    });
});


//получение обекта городов
getData(CITIES_API, (data) => {
    city = JSON.parse(data).filter(item => item.name);
    console.log(city);
    /*тоже самое что
      city = JSON.parse(data).filter((item) => {
          if(item.name === true){
              return true;
          }
          );
    
    */
});

//функция поиска билетов
/*
getPrice(`${CALENDAR}
currency=rub&period_type=month&beginning_of_period=2020-06-01&
origin=SVX&destination=KGD&page=1&limit=30&show_to_affiliates=true&sorting=price&token=
${API_KEY}`, (data) => {
    let price = JSON.parse(data);
    let lowestPrice = price.data[0];
    console.log(lowestPrice);
});
*/

//Собственная функция дла выдачи IATA кода с массива городов
/*
const giveMeCode = (arr, nameOfTown) => {
    let town = arr.filter(item => {
        return item.name === nameOfTown ? true : false;
    });
    return town[0].code;
}
*/
