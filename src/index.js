import './css/styles.css';

import { fetchCountries } from './js/fetchCountries';
import Notiflix from "notiflix";
import debounce from 'lodash.debounce';


Notiflix.Notify.init({
  width: '380px',
  position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  cssAnimationStyle: 'from-left', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
});

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// console.log(refs.countryInfo)

refs.inputSearchBox.addEventListener('input', debounce(onSearchInputBox, DEBOUNCE_DELAY));


function makeCountryList(countries) {
  refs.countryInfo.innerHTML = '';
  const markup = countries
    .map(country => {
      return `<li class="country-list_item">
      <img class="flag" src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="50">
         <p class="country-name"><b>${country.name.official}</b></p>
                </li>`;
    })
    .join('');
  // refs.countryList.insertAdjacentHTML('beforeend', markup);
   refs.countryList.innerHTML = markup;
}


function makeCountryInfo(countries) {
  refs.countryList.innerHTML = '';
    const markup = countries.map(country => {
        return `<div class="country">
    <div class="country-flag">
    <img src="${country.flags.svg}" alt="" width = 70 height = 50>
    </div>
    <h1 class="country-name">${country.name.official}</h1>
    </div>
    <p class="country-info"><b>Capital:</b>  ${country.capital}</p>
    <p class="country-info"><b>Population:</b>  ${country.population}</p>
    <p class="country-info"><b>Languages:</b>  ${ Object.values(country.languages)}</p>`
    })
    // countryInfo.insertAdjacentHTML('beforeend', markup);
  refs.countryInfo.innerHTML = markup;
}

function onSearchInputBox() {
  const enteredCountry = refs.inputSearchBox.value.trim();

  if (enteredCountry === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  // } else if (enteredCountry !== '') {
  
    fetchCountries(enteredCountry).then(foundCountries => {
      if (foundCountries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.',
        // {
        //     timeout: 500,
        // }
        );
        refs.countryList.innerHTML = '';
  
        
      } else if (foundCountries.length > 1 && foundCountries.length <= 10) {
        makeCountryList(foundCountries);
        // return;

      } else if(foundCountries.length === 1) {
        makeCountryInfo(foundCountries);
        // return;
      }
    }).catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      // return error;
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
    })
  }














