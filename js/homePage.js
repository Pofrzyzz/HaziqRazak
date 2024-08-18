// Add the scrolled class to the navbar when the user scrolls down
window.onscroll = function() {
    var navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 10) { // Change happens after scrolling 10px
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};
