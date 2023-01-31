import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import APIRestCounties  from './api-service.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// const countryList = document.querySelector('.country-list');


const restCountries = new APIRestCounties();

function onSearch(e) {
  
  e.preventDefault();
  
  restCountries.searchQuery = e.target.value.trim();
  
  // if (restCountries.length === '0) {
  //   div.innerHTML = ''
  // }

  restCountries.getCountryInfo()
    .then(country => createMarkup)
    .then(updateCountry)
    .catch(onFetchError)
    // .finally(() => restCountries.searchQuery = '')
}

function createMarkup({ name, capital, population, languages, flag}) {

    const langs = Object.values(languages).join(', ')
    // const {
    //   name, 
    //   capital, 
    //   population, 
    //   languages, 
    //   flag } = country;

  return 
    `<img src="${flag}" alt="name.official">
    <h2><${name.official}></h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${langs}</p>`
};
  
function updateCountry() {
  countryInfo.insertAdjacentHTML('beforeend', markup);
} 

function onFetchError(error) {
  Notiflix.Notify.failure('Упс, что-то пошло не так');
}


  

