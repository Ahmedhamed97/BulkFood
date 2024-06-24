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

        // Add hover event listeners for desktop/tablet
        product.addEventListener('mouseenter', function() {
            if (!product.classList.contains('active')) {
                product.classList.add('active');
            }
        });

        product.addEventListener('mouseleave', function() {
            if (product.classList.contains('active')) {
                product.classList.remove('active');
            }
        });

        // Add touch event listener for mobile
        let isTouched = false;
        product.addEventListener('touchstart', function(event) {
            event.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
            console.log("Product touched:", product);

            if (!isTouched) {
                products.forEach(p => p.classList.remove('active')); // Remove 'active' from all
                product.classList.add('active'); // Add 'active' to the touched product
                isTouched = true;
            } else {
                product.classList.remove('active'); // Toggle back to original size
                isTouched = false;
            }
        });
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
