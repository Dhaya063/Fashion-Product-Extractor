// Function to extract product details
const extractProductDetails = () => {
    // Select product name
    const productName = document.querySelector('.product-name h1')?.innerText || '';

    // Select product price
    const productPrice = document.querySelector('.money-amount.price-formatted__price-amount .money-amount__main')?.innerText || '';

    // Select product image URL
    const productImage = document.querySelector('.media-image__image')?.src || '';

    // Save extracted data to Chrome local storage
    chrome.storage.local.set({
        productName: productName,
        productPrice: productPrice,
        productImage: productImage
    });
};

// Use a Mutation Observer to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            extractProductDetails();
            observer.disconnect(); // Stop observing after we get the details
            break;
        }
    }
});

// Start observing the target node
const targetNode = document.querySelector('.product-grid-product__data');
if (targetNode) {
    observer.observe(targetNode, {
        childList: true,
        subtree: true
    });
} else {
    // If the target node isn't found, run the extraction immediately
    extractProductDetails();
}
