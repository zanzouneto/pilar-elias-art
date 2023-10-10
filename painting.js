const slider = document.querySelector('.slider');
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

        // Handle thumbnail click here
        updateSlider();
        updateThumbnail();

        // Set the main image src and alt based on the clicked thumbnail
        const thumbnailImage = thumbnail.querySelector('img');
        mainImageElement.src = thumbnailImage.src;
        mainImageElement.alt = thumbnailImage.alt;
    });
});

// Dynamic content
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:1337/api/paintings?populate=*';
    const titleElement = document.getElementById('dynamic-title');
    const priceElement = document.getElementById('dynamic-price');
    const dimensionsElement = document.getElementById('dynamic-dimensions');
    const materialsElement = document.getElementById('dynamic-materials');
    const mainImageElement = document.getElementById('main-image');

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Assuming the API response contains an array of paintings
            const painting = data.data[0].attributes;
            console.log(painting);

            titleElement.textContent = painting.Title;
            priceElement.textContent = `$${painting.PriceInDollars}`;
            dimensionsElement.textContent = `${painting.widthCm}cm x ${painting.heightCm}cm`;
            materialsElement.textContent = painting.Materials;

            // Check if main image exists
            if (painting.MainPicture && painting.MainPicture.data.attributes.url) {
                // Main image exists, set the src attribute of the main image element
                mainImageElement.src = "http://localhost:1337" + painting.MainPicture.data.attributes.url;
                mainImageElement.alt = painting.MainPicture.data.attributes.alternativeText;
            }

            // Check if extraPictures exist
            if (painting.extraPictures && painting.extraPictures.data.length > 0) {
                // Extra images exist, show the slider and hide the main image
                document.querySelector('.slider-container').classList.remove('hidden');
                document.querySelector('#main-image').classList.add('hidden');

                // Assuming you want to add the images to the slider
                const slider = document.querySelector('.slider');
                const thumbnailContainer = document.querySelector('.thumbnail-container');

                painting.extraPictures.data.forEach((extraPicture) => {
                    // Extract image URLs from attributes and formats
                    const imageUrl = "http://localhost:1337" + extraPicture.attributes.url;
                    const thumbnailUrl = "http://localhost:1337" + extraPicture.attributes.formats.thumbnail.url;

                    // Create slider item
                    const sliderItem = document.createElement('img');
                    sliderItem.classList.add('slider-item');
                    sliderItem.src = imageUrl;
                    sliderItem.alt = extraPicture.attributes.alternativeText; // Set alt text if available
                    slider.appendChild(sliderItem);

                    // Create thumbnail
                    const thumbnail = document.createElement('div');
                    thumbnail.classList.add('thumbnail');

                    // Create thumbnail image
                    const thumbnailImage = document.createElement('img');
                    thumbnailImage.src = thumbnailUrl;
                    thumbnailImage.alt = extraPicture.attributes.alternativeText; // Set alt text if available
                    thumbnail.appendChild(thumbnailImage);

                    // Add click event listener to thumbnails for navigation
                    thumbnail.addEventListener('click', () => {
                        // Handle thumbnail click here
                        currentIndex = Array.from(thumbnailContainer.children).indexOf(thumbnail);
                        updateSlider();
                        updateThumbnail();
                        mainImageElement.src = imageUrl;
                        mainImageElement.alt = extraPicture.attributes.alternativeText;
                    });

                    thumbnailContainer.appendChild(thumbnail);
                });
            } else {
                // No extra images, show the main image and hide the slider
                document.querySelector('.slider-container').classList.add('hidden');
                document.querySelector('#main-image').classList.remove('hidden');
            }
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
});
