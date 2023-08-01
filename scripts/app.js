import { mainSearch2, initSearchFromSearchBar } from './mainSearch2.js';
import { toggleDropdown } from './toggleDropdowns.js';
import { filterDropdownList } from './filterDropdownList.js';

document.querySelector("body > header > div.header-container > nav > div > div > img").addEventListener("click", function(event) {
  mainSearch2();
});



initSearchFromSearchBar()
mainSearch2();
toggleDropdown();
filterDropdownList();