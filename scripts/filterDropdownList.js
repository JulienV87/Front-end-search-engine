function filterDropdownList() {
    const searchInputs = document.querySelectorAll(".search-input");
    
    
    searchInputs.forEach((searchInput) => {
        searchInput.addEventListener("input", function() {
            const filter = searchInput.value.toUpperCase();
            const dropdownItems = document.querySelectorAll(".dropdown-item");

            dropdownItems.forEach((dropdownItem) => {
                const dropdownItemText = dropdownItem.textContent.toUpperCase();
             
                if (dropdownItemText.includes(filter)) {
                    dropdownItem.style.display = "";
                } else {
                    dropdownItem.style.display = "none";
                }
            });
        });
    });
    }

export { filterDropdownList };