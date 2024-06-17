let header = document.querySelector('.page-header');
let navigation = document.querySelector('.page-navigation');
let toggleButton = document.querySelector('.page-header__toggle');

let searchButton = document.querySelector('.page-header__search-button');
let loginButton = document.querySelector('.page-header__login-button');


function MenuToggleClick() {

    toggleButton.classList.toggle('page-header__toggle--active');


    if (toggleButton.classList.contains('page-header__toggle--active')) {
      searchButton.classList.add('page-header__search-button--hidden');
      loginButton.classList.add('page-header__login-button--hidden');
      header.classList.add('page-header--active');
      navigation.classList.add('page-navigation--active');

    } else {
      searchButton.classList.remove('page-header__search-button--hidden');
      loginButton.classList.remove('page-header__login-button--hidden');
      header.classList.remove('page-header--active');
      navigation.classList.remove('page-navigation--active');

    }
}


toggleButton.addEventListener('click', MenuToggleClick);








