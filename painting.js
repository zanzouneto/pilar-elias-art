document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paintingSlug = urlParams.get('slug');

    if (!paintingSlug) {
        window.location.href = "/404.html";
        return;
    }

    const apiUrl = `/api/paintings?populate=*`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Filter the data based on the slug
            const specificPainting = data.data.find(painting => painting.attributes.slug === paintingSlug);

            if (specificPainting) {
                populatePaintingData(specificPainting);
            } else {
                window.location.href = "/404.html";
            }
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
});

function populatePaintingData(paintingData) {
    const attributes = paintingData.attributes;

    document.getElementById('dynamic-title').textContent = attributes.Title;
    document.getElementById('dynamic-price').textContent = `$${attributes.PriceInDollars}`;
    document.getElementById('dynamic-dimensions').textContent = `${attributes.widthCm}cm x ${attributes.heightCm}cm`;
    document.getElementById('dynamic-materials').textContent = attributes.Materials;

    const mainImageElement = document.getElementById('main-image');
    if (attributes.MainPicture && attributes.MainPicture.data.attributes.url) {
        mainImageElement.src = "http://localhost:1337" + attributes.MainPicture.data.attributes.url;
        mainImageElement.alt = attributes.MainPicture.data.attributes.alternativeText;
    }

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

    if (attributes.extraPictures && attributes.extraPictures.data.length > 0) {
        const sliderContainer = document.querySelector('.slider-container');
        const thumbnailContainer = document.querySelector('.thumbnail-container');

        sliderContainer.classList.remove('hidden');
        mainImageElement.classList.add('hidden');

        attributes.extraPictures.data.forEach((extraPicture) => {
            const imageUrl = "http://localhost:1337" + extraPicture.attributes.url;
            const thumbnailUrl = "http://localhost:1337" + extraPicture.attributes.formats.thumbnail.url;

            const sliderItem = document.createElement('img');
            sliderItem.classList.add('slider-item');
            sliderItem.src = imageUrl;
            sliderItem.alt = extraPicture.attributes.alternativeText;
            slider.appendChild(sliderItem);

            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');

            const thumbnailImage = document.createElement('img');
            thumbnailImage.src = thumbnailUrl;
            thumbnailImage.alt = extraPicture.attributes.alternativeText;
            thumbnail.appendChild(thumbnailImage);

            thumbnail.addEventListener('click', () => {
                currentIndex = Array.from(thumbnailContainer.children).indexOf(thumbnail);
                updateSlider();
                updateThumbnail();
                mainImageElement.src = imageUrl;
                mainImageElement.alt = extraPicture.attributes.alternativeText;
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    } else {
        document.querySelector('.slider-container').classList.add('hidden');
        document.querySelector('#main-image').classList.remove('hidden');
    }
}
