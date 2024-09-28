document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length === 0) return; // Ensure there's an active tab

        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: extractProductInfo
        }, (results) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return; // Exit if there's an error
            }

            if (results && results[0]) {
                const { name, price, image } = results[0].result;
                document.getElementById('product-name').innerText = name;
                document.getElementById('product-price').innerText = price;
                document.getElementById('product-image').src = image;
            }
        });
    });
});

// Function to extract product information
function extractProductInfo() {
    // Select product name
    const name = document.querySelector('.product-detail-info__header-name')?.innerText || 'N/A'; 
    // Select product price
    const price = document.querySelector('.money-amount.price-formatted__price-amount .money-amount__main')?.innerText || 'N/A'; 
    // Select product image URL
    const image = document.querySelector('.media-image__image')?.src || ''; 

    return { name, price, image };
}
