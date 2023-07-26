function toggleDropdown() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const searchInput = document.querySelectorAll('.search-input');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
  
    dropdownItems.innerHTML = "";
    
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function() {
            dropdown.classList.toggle('active');
        
    }
    );
    });
  
    searchInput.forEach(function(input) {
        input.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    window.addEventListener('click', function(e) {
        dropdowns.forEach(function(dropdown) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
              
            }
        });
    });
}

export { toggleDropdown };