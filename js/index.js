document.addEventListener("DOMContentLoaded", function () {
    
    // redirect to weather.html
    const searchButton = document.querySelector('.search button');

    searchButton.addEventListener('click', function () {
        window.location.href = 'html/weather.html';
    });


    // change image animation
    const sunMoonImage = document.getElementById("sun-moon-image");

    const images = ["img/sun.png", "img/moon.png", "img/star.png", "img/cloud.png", "img/lightning.png"];
    let currentIndex = 0;

    sunMoonImage.src = images[currentIndex];

    sunMoonImage.addEventListener("animationiteration", function () {
        currentIndex = (currentIndex + 1) % images.length;
        sunMoonImage.src = images[currentIndex];
    });
});
