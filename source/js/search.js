const searchButtons = document.querySelectorAll('.page-header__search-button');
const searchAreas = document.querySelectorAll('.search');
const searchInputs = document.querySelectorAll('.search__input');
const searchClears = document.querySelectorAll('.search__close-button');


function SearchToggleClick(){

  searchAreas.forEach( searchArea => {
    searchArea.classList.toggle('search--active');
  })


}


function ClearInput(){
  searchInputs.forEach(searchInput => {
    searchInput.value = '';
  })
}


searchButtons.forEach(searchButton =>{

  searchButton.addEventListener('click', SearchToggleClick);
})

searchClears.forEach(searchClear =>{

  searchClear.addEventListener('click', ClearInput);
})




// let searchDesktopButton = document.querySelector('.page-header__search-button--desktop');

// let searchDesktopArea = document.querySelector('.search--desktop');

// let searchClearDesktopButton = document.querySelector('.search__clear-button--desktop');

// let searchDesktopInput = document.querySelector('.search__input--desktop');


// function ClearInput(){

//   console.log("test");
//   searchInput.value = '';

// }


// function SearchToggleClick(){

//   searchDesktopArea.classList.toggle('search--active');
//   console.log("test");

//   // toggleButton.classList.toggle('page-header__toggle--active');

// }

// searchDesktopButton.addEventListener('click', SearchToggleClick);
// //searchClearDesktopButton.addEventListener('click', ClearInput(searchDesktopInput));

// // searchMainButton.addEventListener('click', SearchToggleClick);
// // console.log('тест');

// // searchClearButton.addEventListener('click', ClearInput);
