document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const colorThief = new ColorThief();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const img = product.querySelector('.product-image');
        console.log(`Processing image: ${img.src}`);

        if (img.complete) {
            console.log("Image already loaded");
            applyBackgroundColor(img, product);
        } else {
            img.addEventListener('load', function() {
                console.log("Image loaded");
                applyBackgroundColor(img, product);
            });
        }
    });

    function applyBackgroundColor(img, product) {
        try {
            console.log(`Applying background color for image: ${img.src}`);
            const dominantColor = colorThief.getColor(img);
            console.log(`Dominant color: ${dominantColor}`);
            product.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        } catch (error) {
            console.error('Error extracting color:', error);
        }
    }
});