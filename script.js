document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display the default category on page load
    fetchData('smileys-and-people', document.getElementById('smileysBtn'));
});

async function fetchData(category, buttonElement) {
    try {
        // Clear the active class from all buttons
        const buttons = document.querySelectorAll('.btn-outline-primary');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Set the clicked button as active
        buttonElement.classList.add('active');

        // Get the container where icons will be displayed
        let iconsBlock = document.getElementById("displayIconsList");
        
        // Clear the container before adding new icons
        iconsBlock.innerHTML = "";

        // Fetch the data from the API
        let catData = await fetch(`https://emojihub.yurace.pro/api/all/category/${category}`);
        let result = await catData.json();
        console.log(result);

        // Create and append new icons to the container
        result.forEach(element => {
            let smilelyDiv = document.createElement("div");
            smilelyDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "smilelyBlock");

            let smilelyImg = document.createElement("span");
            smilelyImg.classList.add("smilelyImg");
            smilelyImg.innerHTML = element.htmlCode[0];
            
            smilelyImg.setAttribute("data-bs-toggle", "tooltip");
            smilelyImg.setAttribute("data-bs-placement", "top");
            smilelyImg.setAttribute("title", "Copy"); // Use title attribute for initial tooltip text

            // Append the smiley image to its container
            smilelyDiv.appendChild(smilelyImg);
            iconsBlock.appendChild(smilelyDiv);
        });

        // Initialize Bootstrap tooltips for newly added elements
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(triggerEl => {
            const tooltip = new bootstrap.Tooltip(triggerEl);

            // Add click event listener to change tooltip text
            triggerEl.addEventListener('click', function () {
                const originalTitle = this.getAttribute('title');
                navigator.clipboard.writeText(this.innerHTML)
                    .then(() => {
                        tooltip.setContent({ '.tooltip-inner': 'Copied' });
                        setTimeout(() => {
                            tooltip.setContent({ '.tooltip-inner': originalTitle });
                        }, 1500);
                    })
                    .catch(error => {
                        console.log("Failed to copy: " + error);
                    });
            });
        });

    } catch (error) {
        console.log(error);
    }
}
