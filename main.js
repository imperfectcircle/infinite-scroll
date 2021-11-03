/* eslint-disable operator-linebreak */
/* eslint-disable no-alert */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let allImagesAreLoaded = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 15;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const checkIfImagesAreLoadedHandler = () => {
    imagesLoaded += 1;
    if (imagesLoaded === totalImages) {
        allImagesAreLoaded = true;
        loader.hidden = true;
    }
};

const setElementsAttributesHelper = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

const createAndDisplayElements = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((el) => {
        const item = document.createElement('a');
        setElementsAttributesHelper(item, {
            href: el.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        if (el.description === null) {
            setElementsAttributesHelper(img, {
                src: el.urls.regular,
                alt: 'a random image',
                title: 'a random image',
            });
        } else {
            setElementsAttributesHelper(img, {
                src: el.urls.regular,
                alt: el.description,
                title: el.description,
            });
        }

        img.addEventListener('load', checkIfImagesAreLoadedHandler);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};

const getPhotosFromApi = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        createAndDisplayElements();
    } catch (error) {
        alert(
            `An error occured, plese try later or contact the website owner and report this error: ${error}`,
        );
    }
};

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        allImagesAreLoaded
    ) {
        allImagesAreLoaded = false;
        getPhotosFromApi();
    }
});

// On Load
getPhotosFromApi();
