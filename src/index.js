import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import RestCountiesAPI from './api-service.js';
import './css/styles.css';

window.onload = () => document.querySelector('#search-box').focus();

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
let markup = '';

const restCountriesAPI = new RestCountiesAPI();

countryInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  restCountriesAPI.searchQuery = e.target.value.trim();
  // console.log(restCountriesAPI.searchQuery);

  if (restCountriesAPI.searchQuery === '') {
    clearCountries();
    return;
  }

  restCountriesAPI
    .getCountryInfo()
    .then(createMarkup)
    .catch(onFetchError)
}

function createMarkup(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;

  } else if (countries === undefined) {
    clearCountries();
    return;

  } else if (countries.length === 1) {
    const { name, capital, population, languages, flags } = countries[0];
    markup = `<img src="${flags.svg}" width="100" alt="${flags.alt}"></img>
        <h2>${name.official}</h2>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages).join(', ')}</p>`;
    updateCountry(markup);
    // console.log(markup);
    return;

  } else {
    markup = countries
      .map(({ name, flags }) => {
        return `<li><img src="${flags.svg}" width="40" alt="${flags.alt}"></img><h2>${name.official}</h2></li>`;
      })
      .join('');
    updateCountryList(markup);
  }
}

function clearCountries() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function updateCountry(markup) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = markup;
}

function updateCountryList(markup) {
  countryInfo.innerHTML = '';
  countryList.innerHTML = markup;
}

function onFetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
