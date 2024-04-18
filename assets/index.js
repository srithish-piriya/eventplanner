function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [year, month, day] = dateString.split('-').map(Number);

    const monthName = months[month - 1]; // Month index starts from 0
    const formattedDate = `${monthName} ${day}, ${year}`;

    return formattedDate;
}

async function fetchAndCreateCards() {
    try {
        const response = await fetch("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco");
        const data = await response.json();
        const events = data.events;

        const carousel = document.querySelector('.carousel');

        // Clear existing cards
        carousel.innerHTML = '';

        // Create and append new cards
        events.forEach(async event => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            const thumbnailImageUrl = event.imgUrl;
            // const proxyImageUrl = `/proxy-image?url=${thumbnailImageUrl}`; // Construct proxy image URL
            // console.log(proxyImageUrl)
            // // Set background image using proxy image URL
            // card.style.backgroundImage = `url('${proxyImageUrl}')`;
            card.innerHTML = `
            <div class="product-details">
                <div class="top">
                    <div class="country">${event.eventName}</div>
                    <div class="right">${formatDate(event.date.split('T')[0])}</div>
                </div>
                <div class="bottom">
                    <div>${event.cityName}</div>
                    <div class="right">${event.weather} | ${event.distanceKm.split('.')[0]}Km</div>

                </div>
            </div>
            `;
            carousel.appendChild(card);
        });

        let translateValues = Array.from(carousel.children).map(() => 0);
        let lastScrollPosition = 0;

        // Function to slide cards based on translate values
        function slideCards() {
            Array.from(carousel.children).forEach((card, index) => {
                card.style.transform = `translateX(${translateValues[index]}px)`;
            });
        }

        // Listen for mouse wheel events to slide the carousel
        carousel.addEventListener('wheel', (event) => {
            const delta = event.deltaX || event.deltaY;

            // Update translate values based on the scroll direction
            translateValues = translateValues.map((value) => value - delta);
            slideCards();
        });

        // Listen for touch events to slide the carousel on touch devices
        let touchStartX = 0;

        carousel.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
            lastScrollPosition = touchStartX;
        });

        carousel.addEventListener('touchmove', (event) => {
            const touchMoveX = event.touches[0].clientX;
            const delta = touchMoveX - lastScrollPosition;

            translateValues = translateValues.map((value) => value - delta);
            slideCards();

            lastScrollPosition = touchMoveX;
        });

        carousel.addEventListener('touchend', () => {
            touchStartX = 0;
        });

        // Function to slide cards using arrow keys
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                translateValues = translateValues.map((value) => value + 100);
                slideCards();
            } else if (event.key === 'ArrowRight') {
                translateValues = translateValues.map((value) => value - 100);
                slideCards();
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function upcomingshows(){
    try {
        const response = await fetch("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming");
        const data = await response.json();
        const events = data.events;

        const carousel = document.querySelector('.up-container');

        // Clear existing cards
        carousel.innerHTML = '';

        // Create and append new cards
        events.forEach(async event => {
            const card = document.createElement('div');
            card.classList.add('up-card');
            const thumbnailImageUrl = event.imgUrl;
            // const proxyImageUrl = `/proxy-image?url=${thumbnailImageUrl}`; // Construct proxy image URL
            // console.log(proxyImageUrl)
            // // Set background image using proxy image URL
            // card.style.backgroundImage = `url('${proxyImageUrl}')`;
            // card.innerHTML = `
            // <div class="product-details">
            //     <div class="top">
            //         <div class="country">${event.eventName}</div>
            //         <div class="right">${formatDate(event.date.split('T')[0])}</div>
            //     </div>
            //     <div class="bottom">
            //         <div>${event.cityName}</div>
            //         <div class="right">${event.weather} | ${event.distanceKm.split('.')[0]}Km</div>

            //     </div>
            // </div>
            // `;
            card.innerHTML =`
            <div class="up-bg">
            <div class="date">${formatDate(event.date.split('T')[0])}</div>
            </div>
            <div class="up-dtls">
                <div class="d-1">
                    <p>${event.eventName}</p>
                </div>
                <div class="d-2">
                    <p>${event.cityName}</p>
                    <p>${event.weather} | ${event.distanceKm.split('.')[0]}Km</p>
                </div>
            </div>
            `
            carousel.appendChild(card);
        });

        

    } catch (error) {
        console.error('Error fetching data:', error);
    }


}

fetchAndCreateCards();
upcomingshows();
