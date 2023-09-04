// Function to initialize filtering
function initializeFiltering() {
    // Hide rows with complete or canceled set to 1
    document.querySelectorAll('.task-list tbody tr').forEach(row => {
        const sorts = JSON.parse(row.getAttribute('data-sorts'));
        if (sorts === null) { return; }
        if (sorts.complete === '1' || sorts.canceled === '1') {
            row.style.display = 'none';
        }
    });

    // Show only tasks assigned to the current user
    const currentUser = '0'; // Replace with the user ID of the current user
    document.querySelectorAll('.task-list tbody tr').forEach(row => {
        const sorts = JSON.parse(row.getAttribute('data-sorts'));
        if (sorts === null) { return; }
        if (sorts.user !== currentUser) {
            row.style.display = 'none';
        }
    });

    // Populate dropdowns with unique entries
    const caseDropdown = document.getElementById('case');
    if (caseDropdown) { populateDropdown('case'); }
    populateDropdown('assigned_to');
    populateDropdown('category');
}

// Function to populate dropdown with unique entries
function populateDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const uniqueEntries = new Set();

    document.querySelectorAll('.task-list tbody tr').forEach(row => {
        const sorts = JSON.parse(row.getAttribute('data-sorts'));
        if (sorts === null) { return; }
        const entry = sorts[dropdownId];
        if(dropdownId == 'assigned_to' && sorts.user == sorts.assigned_to_num){ return; }
        if (entry !== 'complete' && entry !== 'canceled' && entry !== 'all' && entry !== 'none') {
            uniqueEntries.add(entry);
        }
    });

    uniqueEntries.forEach(entry => {
        const option = document.createElement('option');
        option.value = entry;
        option.textContent = entry;
        dropdown.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function() {
// Call the function to initialize filtering
initializeFiltering();
updateFiltering();

// Event listeners for filtering controls
const caseDropdown = document.getElementById('case');
document.getElementById('showComplete').addEventListener('change', updateFiltering);
document.getElementById('showCanceled').addEventListener('change', updateFiltering);
if (caseDropdown) { document.getElementById('case').addEventListener('change', updateFiltering); }
document.getElementById('assigned_to').addEventListener('change', updateFiltering);
document.getElementById('category').addEventListener('change', updateFiltering);

});

// Function to update filtering based on selected options
function updateFiltering() {
    const caseDropdown = document.getElementById('case');
    const showComplete = document.getElementById('showComplete').checked;
    const showCanceled = document.getElementById('showCanceled').checked;
    let selectedCase = 'all';
    if (caseDropdown) { selectedCase = document.getElementById('case').value; }
    const selectedAssignedTo = document.getElementById('assigned_to').value;
    const selectedCategory = document.getElementById('category').value;

    document.querySelectorAll('.task-list tbody tr').forEach(row => {
        const sorts = JSON.parse(row.getAttribute('data-sorts'));
        if (sorts === null) { return; }
        const complete = sorts.complete === '1';
        const canceled = sorts.canceled === '1';
        const matchingCase = selectedCase === 'all' || selectedCase === sorts.case;
        const matchingAssignedTo = selectedAssignedTo === 'all' || selectedAssignedTo === sorts.assigned_to || ((sorts.user === sorts.assigned_to_num) && ( selectedAssignedTo === 'user'));
        const matchingCategory = selectedCategory === 'all' || selectedCategory === sorts.category;
        row.style.display = 'none';
        if (((showComplete && complete) || (showCanceled && canceled)) && (matchingCase && matchingAssignedTo && matchingCategory)) {
            row.style.display = 'table-row';
        } 
        if (!complete && !canceled && matchingCase && matchingAssignedTo && matchingCategory) {
            row.style.display = 'table-row';
        }
    });
}
