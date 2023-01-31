import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import RestCountiesAPI  from './api-service.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// const countryList = document.querySelector('.country-list');


const restCountriesAPI = new RestCountiesAPI();

function onSearch(e) {
  
  e.preventDefault();
  
  restCountriesAPI.searchQuery = e.target.value.trim();
  
  restCountriesAPI.getCountryInfo()
    .then(createMarkup)
    .then(updateCountry)
    .catch(onFetchError)
    .finally(() => restCountriesAPI.searchQuery = '')
}

function createMarkup({ name, capital, population, languages, flags }) {

    const langs = Object.values(languages).join(', ');

  return 
    `<img src="${flags.svg}" alt="name.official">
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


 // if (restCountriesAPI.length === 0) {
  //   div.innerHTML = ''
  // }
