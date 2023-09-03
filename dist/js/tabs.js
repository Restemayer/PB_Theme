document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and tab contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab and corresponding tab content
            tab.classList.add('active');
            const targetContentId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetContentId);
            targetContent.classList.add('active');
        });
    });
});
