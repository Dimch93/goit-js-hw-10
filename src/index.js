// live_l1N2KaqFBnWSPpFL0pMbcd4AalFUPTVvgIzIzgCup7Re6x2pR2M90j5F1sKu3feC;

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const url = `https://api.thecatapi.com/v1/breeds`;
const api_key =
  'live_l1N2KaqFBnWSPpFL0pMbcd4AalFUPTVvgIzIzgCup7Re6x2pR2M90j5F1sKu3feC';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let storedBreeds = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      storedBreeds.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: storedBreeds,
    });
  })
  .catch(onFetchError);

breedSelect.addEventListener('change', onBreedSelect);

function onBreedSelect(event) {
  breedSelect.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      breedSelect.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  breedSelect.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
