// Logic for slider and thumbnails
const slider = document.querySelector('.slider');
const thumbnails = document.querySelectorAll('.thumbnail');
let currentIndex = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function updateThumbnail() {
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.remove('active');
        if (index === currentIndex) {
            thumbnail.classList.add('active');
        }
    });
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentIndex = index;

        updateSlider();
        updateThumbnail();

        const thumbnailImage = thumbnail.querySelector('img');
        mainImageElement.src = thumbnailImage.src;
        mainImageElement.alt = thumbnailImage.alt;
    });
});

// This condition checks if the slider has any content, and if not, it hides the slider and displays the main image.
if (slider.children.length === 0) {
    document.querySelector('.slider-container').classList.add('hidden');
    document.querySelector('#main-image').classList.remove('hidden');
}
