var ascending = new Boolean()
ascending = true;

function SortData(attribute, ascending) {    
    var elements = document.querySelectorAll("[data-sorts]");
    var elementsArray = Array.from(elements);
    
    elementsArray.sort(function(a, b) {
      var aVal = JSON.parse(a.dataset.sorts)[attribute];
      var bVal = JSON.parse(b.dataset.sorts)[attribute];
      
      if (aVal < bVal) {
        return ascending ? -1 : 1;
      } else if (aVal > bVal) {
        return ascending ? 1 : -1;
      } else {
        return 0;
      }
    });

    var list = document.querySelector("#list");
    elementsArray.forEach(e => list.appendChild(e));
}

document.addEventListener('DOMContentLoaded', function() {
    const ascendingButton = document.querySelector('#ascending-button');
    const descendingButton = document.querySelector('#descending-button');
    const ascendingDateButton = document.querySelector('#ascending_date-button');
    const descendingDateButton = document.querySelector('#descending_date-button');
    const sortByDropdown = document.querySelector('#sort_by');

    SortData('county', ascending);



    ascendingButton.addEventListener('click', () => {
      const selectedOption = sortByDropdown.options[sortByDropdown.selectedIndex];
      const attribute = selectedOption.dataset.sorter;
      ascendingButton.classList.add('hidden');
      descendingButton.classList.remove('hidden');
      ascending = false;
      SortData(attribute, ascending);
    });

    descendingButton.addEventListener('click', () => {
      const selectedOption = sortByDropdown.options[sortByDropdown.selectedIndex];
      const attribute = selectedOption.dataset.sorter;
      descendingButton.classList.add('hidden');
      ascendingButton.classList.remove('hidden');
      ascending = true;
      SortData(attribute, ascending);
    });

    ascendingDateButton.addEventListener('click', () => {
      const selectedOption = sortByDropdown.options[sortByDropdown.selectedIndex];
      const attribute = selectedOption.dataset.sorter;
      ascendingDateButton.classList.add('hidden');
      descendingDateButton.classList.remove('hidden');
      ascending = false;
      SortData(attribute, ascending);
      });
  
    descendingDateButton.addEventListener('click', () => {
      const selectedOption = sortByDropdown.options[sortByDropdown.selectedIndex];
      const attribute = selectedOption.dataset.sorter;
      descendingDateButton.classList.add('hidden');
      ascendingDateButton.classList.remove('hidden');
      ascending = true;
      SortData(attribute, ascending);
    });

    sortByDropdown.addEventListener('change', () => {        
        const selectedOption = sortByDropdown.options[sortByDropdown.selectedIndex];
        const attribute = selectedOption.dataset.sorter;
        // Find all elements with the sort-button class
        const sortButtons = document.querySelectorAll('.sort-button');

        // Loop through each element and add the hidden class if it doesn't have it
        sortButtons.forEach((option) => {
          if (!option.classList.contains('hidden')) {
            option.classList.add('hidden');
          }
        });

        if (attribute == "next_hearing") {
          if (ascending) { ascendingDateButton.classList.remove('hidden'); }
          else { descendingDateButton.classList.remove('hidden'); }
        }
        else {
          if (ascending) { ascendingButton.classList.remove('hidden'); }
          else { descendingButton.classList.remove('hidden'); }
        }

        SortData(attribute, ascending);
    });
});
