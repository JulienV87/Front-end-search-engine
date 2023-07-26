import { mainSearch, initSearchFromSearchBar } from './mainSearch.js';
import { toggleDropdown } from './toggleDropdowns.js';
import { filterDropdownList } from './filterDropdownList.js';

document.querySelector("body > header > div.header-container > nav > div > div > img").addEventListener("click", function(event) {
  mainSearch();
});



initSearchFromSearchBar()
mainSearch();
toggleDropdown();
filterDropdownList();