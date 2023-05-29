function getFilterOptions() {
    let filterOptions = {};
    const cardLinks = document.querySelectorAll('.card-link:not(.hidden)');
    let add_no_schedule_options = false;
    cardLinks.forEach((cardLink) => {
      const dataSorts = JSON.parse(cardLink.dataset.sorts);
      Object.entries(dataSorts).forEach(([key, value]) => {
        if (key === 'next_hearing') { 
          if (!filterOptions[key]) {
            filterOptions[key] = [];
          }         
          if (value === '0') {
            add_no_schedule_options = true;
          } else {            
            const month = value.substring(4, 6);
            switch (month) {
              case '01':
                filterOptions[key].includes('January') ? null : filterOptions[key].push('January');
                break;
              case '02':
                filterOptions[key].includes('February') ? null : filterOptions[key].push('February');
                break;
              case '03':
                filterOptions[key].includes('March') ? null : filterOptions[key].push('March');
                break;
              case '04':
                filterOptions[key].includes('April') ? null : filterOptions[key].push('April');
                break;
              case '05':
                filterOptions[key].includes('May') ? null : filterOptions[key].push('May');
                break;
              case '06':
                filterOptions[key].includes('June') ? null : filterOptions[key].push('June');
                break;
              case '07':
                filterOptions[key].includes('July') ? null : filterOptions[key].push('July');
                break;
              case '08':
                filterOptions[key].includes('August') ? null : filterOptions[key].push('August');
                break;
              case '09':
                filterOptions[key].includes('September') ? null : filterOptions[key].push('September');
                break;
              case '10':
                filterOptions[key].includes('October') ? null : filterOptions[key].push('October');
                break;
              case '11':
                filterOptions[key].includes('November') ? null : filterOptions[key].push('November');
                break;
              case '12':
                filterOptions[key].includes('December') ? null : filterOptions[key].push('December');
                break;
            }
          }
        } else {
          console.log(key)
          if (value == "Nothing Scheduled") { return; }
          if (!filterOptions[key]) { 
            filterOptions[key] = []; 
          }           
          if (!filterOptions[key].includes(value)) {
            filterOptions[key].push(value);
          }
        }               
      });
    });
    const monthsInOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];    

    Object.keys(filterOptions).forEach((key, index) => {
      if (key === 'next_hearing') { 
        filterOptions['next_hearing'].sort((a, b) => {
        return monthsInOrder.indexOf(a) - monthsInOrder.indexOf(b);
      });}
      else {
        filterOptions[key].sort();
      }
    });
    
    if (add_no_schedule_options) {
      filterOptions['next_hearing'].unshift('Filter Unscheduled Cases');
      filterOptions['next_hearing'].unshift('Only Unscheduled Cases');
    } 
    for (let key in filterOptions) {
        if (filterOptions[key].length > 1) {
          filterOptions[key].unshift('All');
        }
      }
    return filterOptions;
  }


  function populateDropdowns(json) {
    for (let key in json) {
      const dropdown = document.getElementById(key);      
      if (dropdown) {
        if (parseInt(dropdown.nextElementSibling.textContent) > 0) { continue; }
        // Clear existing options
        dropdown.innerHTML = '';       
  
        // Create options from JSON array
        const options = json[key];
        for (let i = 0; i < options.length; i++) {
          const option = document.createElement('option');
          option.value = options[i];
          option.text = options[i];
          dropdown.appendChild(option);
        }
      }
    }
  }

  function getHighValue(elements) {
    let high_value = 0;
    elements.forEach(element => {
        const sibling = element.nextElementSibling;
        const content = parseInt(sibling.textContent);
      
        if (content > high_value) {
          high_value = content;
        }    
  });
  return high_value;
}

function onChange(event, dropdowns){
    let high_value = getHighValue(dropdowns);    
    const bubble_div = event.target.nextElementSibling;
    let current_value = parseInt(bubble_div.textContent);
    if (current_value == 0) {
        bubble_div.textContent = (high_value + 1).toString();
    }
    else if (current_value < high_value) {        
        dropdowns.forEach(element => {
            if (element == event.target){ return; }
            let sib_val = parseInt(element.nextElementSibling.textContent);
            if (sib_val > current_value) {
                element.nextElementSibling.textContent = "0";
                element.value = "All";
                element.querySelector("option[value='All']");
            } 

        });        
    }
    if (event.target.value == "All") { bubble_div.textContent = "0"; } 
}

function setBubbles() {
    const bubbles = document.querySelectorAll('.number-bubble');
    bubbles.forEach(bubble => {
      if (parseInt(bubble.textContent) > 0) {
        bubble.classList.add('show');
      } else {
        bubble.classList.remove('show');
      }
    });
}

function filterCards(dropdowns) {
  const cardLinks = document.querySelectorAll('.card-link');
  cardLinks.forEach((element) => {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
  });
  dropdowns.forEach((dropdown) => {
    if ( dropdown.value == "All" || dropdown.options.length < 2 ){ return; }

    if ( dropdown.id == "next_hearing" ){
      cardLinks.forEach((card) => {
        sorts_JSON = JSON.parse(card.dataset.sorts);
        value = sorts_JSON[dropdown.id];
        if (dropdown.value == 'Filter Unscheduled Cases') {
          if ( value == "0" ) { card.classList.add('hidden'); }
          return;
        }
        if (dropdown.value == 'Only Unscheduled Cases') {
          if ( value != "0" ) { card.classList.add('hidden'); }
          return;
        }
        if (value == "0") {
          card.classList.add('hidden')
          return;
        }
        const month = value.substring(4, 6);
        switch(dropdown.value) {
          case "January":
            if ( month != "01" ) { card.classList.add('hidden'); }
            break;
          case "February":
            if ( month != "02" ) { card.classList.add('hidden'); }
            break;
          case "March":
            if ( month != "03" ) { card.classList.add('hidden'); }
            break;
          case "April":
            if ( month != "04" ) { card.classList.add('hidden'); }
            break;
          case "May":
            if ( month != "05" ) { card.classList.add('hidden'); }
            break;
          case "June":
            if ( month != "06" ) { card.classList.add('hidden'); }
            break;
          case "July":
            if ( month != "07" ) { card.classList.add('hidden'); }
            break;
          case "August":
            if ( month != "08" ) { card.classList.add('hidden'); }
            break;
          case "September":
            if ( month != "09" ) { card.classList.add('hidden'); }
            break;
          case "October":
            if ( month != "10" ) { card.classList.add('hidden'); }
            break;
          case "November":
            if ( month != "11" ) { card.classList.add('hidden'); }
            break;
          case "December":
            if ( month != "12" ) { card.classList.add('hidden'); }
            break;
          default:
            return;
        }        
      });
    }
    else {
      cardLinks.forEach((card) => {
        sorts_JSON = JSON.parse(card.dataset.sorts);
        value = sorts_JSON[dropdown.id];
        if (value != dropdown.value) { card.classList.add('hidden'); }
      });
    }
  });
}

  document.addEventListener('DOMContentLoaded', function() { 
    filter_options = getFilterOptions();
    console.log("Filter options complete")
    populateDropdowns(filter_options);

    // listen for changes on all dropdowns
    // get all dropdowns in an array
const dropdowns = Array.from(document.querySelectorAll('.filter-drop'));

// iterate over each dropdown
dropdowns.forEach(dropdown => {
  // attach an event listener to each dropdown
  dropdown.addEventListener('change', function(event) {
    onChange(event, dropdowns);
    filterCards(dropdowns);
    const filter_options = getFilterOptions();
    populateDropdowns(filter_options);
    setBubbles();
  });
});
  });
  