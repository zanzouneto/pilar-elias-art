document.addEventListener('DOMContentLoaded', function() {
    fetchPaintings();
});

function fetchPaintings() {
    fetch('/api/paintings?populate=*')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayPaintings(data.data); // Assuming data structure is { data: [...] }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
            // Optionally display an error message to the user.
        });
}

function displayPaintings(paintings) {
    const galleryDiv = document.getElementById('paintingsGallery');

    paintings.forEach(painting => {
        // Create a new div for each painting
        const paintingDiv = document.createElement('div');
        
        // Give the div a class named 'painting-item'
        paintingDiv.classList.add('painting-item');
        
        // Check if the painting has a MainPicture and add it to the div
        if (painting.attributes && painting.attributes.MainPicture && painting.attributes.MainPicture.data && painting.attributes.MainPicture.data.attributes) {
            const paintingImage = document.createElement('img');
            paintingImage.src = "http://localhost:1337" + painting.attributes.MainPicture.data.attributes.url;
            paintingImage.alt = painting.attributes.Title || 'Painting'; // use a default alt if title is missing
            paintingDiv.appendChild(paintingImage);
        }

        // Check if the painting has a Title and add it to the div
        if (painting.attributes && painting.attributes.Title) {
            const paintingTitle = document.createElement('a');
            paintingTitle.href = `painting.html?slug=${slugify(painting.attributes.Title)}`; 
            paintingTitle.textContent = painting.attributes.Title;
            paintingDiv.appendChild(paintingTitle);
        }

        // Append the painting div to the main gallery
        galleryDiv.appendChild(paintingDiv);
    });
}


function slugify(text) {
    if (!text) return ''; 

    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word characters
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
