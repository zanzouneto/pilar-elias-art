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

//dynamic content// 
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:1337/api/paintings?populate=*'; 
    const titleElement = document.getElementById('dynamic-title');
    const priceElement = document.getElementById('dynamic-price');
    const dateElement = document.getElementById('dynamic-date');
    const availabilityElement = document.getElementById('dynamic-availability');
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
            // dateElement.textContent = new Date(painting.DateFinished).toLocaleDateString();
            // availabilityElement.textContent = painting.AvailableforSale ? 'Available' : 'Not Available';
            dimensionsElement.textContent = `${painting.widthCm}cm x ${painting.heightCm}cm`;
            materialsElement.textContent = painting.Materials;

            // Check if main image exists
            if (painting.MainPicture && painting.MainPicture.data.attributes.url) {
                // Main image exists, set the src attribute of the main image element
                mainImageElement.src = "http://localhost:1337" + painting.MainPicture.data.attributes.url;
                mainImageElement.alt = painting.MainPicture.data.attributes.alternativeText;
            }


        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });

    }
);



