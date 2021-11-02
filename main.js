const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

// Create Elements For Links & Photos, Add to DOM
const displayPhotos = () => {
    // Run function for each object in photosArray
    photosArray.forEach((el) => {
        // Create an anchor element to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: el.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: el.urls.regular,
            alt: el.description,
            title: el.description,
        });
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

// Get photos from Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        alert(
            `An error occured, plese try later or contact the website owner and report this error: ${error}`,
        );
        console.log(error);
    }
};

// On Load
getPhotos();
