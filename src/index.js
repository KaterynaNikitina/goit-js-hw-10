import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import APIRestCounties  from './api-service.js';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
// let inputValue = '';


const countryInput = document.querySelector('#search-box');
countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const restCountries = new APIRestCounties();

function onSearch(e) {
  
  e.preventDefault();
  restCountries.searchQuery = e.target.value.trim();
  
  if (restCountries.searchQuery === '') {
    return alert('No data');
  }

  restCountries.getCountryInfo()
    .then(createMarkup)
    .then(updateCountry)
    .catch(onFetchError)
    .finally(() => restCountries.searchQuery = '')
}


function createMarkup({ name, capital, population, languages, flags }) {
  const [{
    name, 
    capital, 
    population, 
    languages, 
    flags: { svg: flag} }]= country;

    const langs = Object.values(languages).join(', ')

  return markup = 
    `<img src="${flags.svg}" alt="flag">
    <h2><${name.official}></h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${langs}</p>`
};
  
function updateCountry() {
  countryInfo.insertAdjacentHTML ('beforeend', markup);
} 

function onFetchError(error) {
  Notiflix.Notify.failure('Упс, что-то пошло не так');
}


  

