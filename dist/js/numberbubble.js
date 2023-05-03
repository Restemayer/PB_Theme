document.addEventListener('DOMContentLoaded', function() {
    const numberBubbles = document.querySelectorAll('.number-bubble');
    numberBubbles.forEach(numberBubble => {
    const value = parseInt(numberBubble.textContent);
    if (value > 0) {
        numberBubble.classList.add('show');
    } else {
        numberBubble.classList.remove('show');
    }
    });
});
