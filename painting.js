const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll('.slider-item');
const thumbnails = document.querySelectorAll('.thumbnail');

let currentIndex = 0;

// Function to update the slider
function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Function to change the active thumbnail
function updateThumbnail() {
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.remove('active');
        if (index === currentIndex) {
            thumbnail.classList.add('active');
        }
    });
}

// Event listeners for thumbnail clicks
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        updateThumbnail();
    });
});
