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










// ===============================================================================



// const BASE_URL = 'https://restcountries.com/v3.1/name/';

// async function fetchCountries(name) {
//   const response = await fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`);
//   const countries = await response.json();
//   return countries;
// }


// import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// Notiflix.Notify.init({
//   width: '380px',
//   position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
//   cssAnimationStyle: 'from-left', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
// });


// const DEBOUNCE_DELAY = 300;

// const searchBox = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');

// function renderCountryList(countries) {
//   countryList.innerHTML = '';

//   if (countries.length === 0) {
//     return;
//   }

//   if (countries.length > 10) {
//     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//     return;
//   }

//   const countryItems = countries.map((country) => {
//     const countryItem = document.createElement('div');
//     countryItem.classList.add('country-item');

//     const flag = document.createElement('img');
//     flag.classList.add('flag');
//     flag.src = country.flags.svg;
//     flag.setAttribute("width", "50px");

//     const name = document.createElement('span');
//     name.classList.add('name');
//       name.textContent = country.name.official;
//     //   console.log(country.name.official);

//     countryItem.appendChild(flag);
//     countryItem.appendChild(name);

//     return countryItem;
//   });

//   countryList.append(...countryItems);
// }

// function onSearchInput(event) {
//   const searchTerm = event.target.value.trim();

//   if (searchTerm === '') {
//     countryList.innerHTML = '';
//     return;
//   }

//   fetchCountries(searchTerm).then((countries) => {
//     renderCountryList(countries);
//   }).catch(error => {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//       // return error;
//       refs.countryList.innerHTML = '';
//       refs.countryInfo.innerHTML = '';
//     });
// }

// searchBox.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));






// _______________________________________________

// function makeCountryInfo(countries) {
//   refs.countryInfo.innerHTML = '';
//       const markup = countries
//         .map(country => {
//           return `<li>
//       <img src="${country.flags.svg}" alt="Flag of ${
//             country.name.official
//           }" width="40">
//          <b>${country.name.official}</b></p>
//             <p><b>Capital</b>: ${country.capital}</p>
//             <p><b>Population</b>: ${country.population}</p>
//             <p><b>Languages</b>: ${Object.values(country.languages)} </p>
//                 </li>`;
//         })
//         .join('');
//   // refs.countryList.insertAdjacentHTML('beforeend', markup);
//    refs.countryList.innerHTML = markup;
// }








