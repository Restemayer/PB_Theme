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
    const sortByDropdown = document.querySelector('#sort_by');



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

    sortByDropdown.addEventListener('change', () => {        
        const selectedOption = sortByDropdown.options[sortByDropdown.selectedIndex];
        const attribute = selectedOption.dataset.sorter;
        SortData(attribute, ascending);
    });
});
