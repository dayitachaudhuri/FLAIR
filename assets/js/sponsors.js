let sponsorSlideIndex = 0;
let sponsorInterval;
let sponsorsData = [];
const SPONSORS_PER_SLIDE = 4;

function showSponsorSlide(n) {
    const wrapper = document.querySelector('.sponsors-slides-wrapper');
    if (!wrapper || sponsorsData.length === 0) return;
    const total = sponsorsData.length;
    let start = ((n % total) + total) % total;
    sponsorSlideIndex = start;
    let cards = [];
    for (let i = 0; i < SPONSORS_PER_SLIDE; i++) {
        const idx = (start + i) % total;
        cards.push(sponsorsData[idx]);
    }
    wrapper.innerHTML = `<div class="sponsors-row d-flex justify-content-center flex-wrap">${cards.map(sponsor => `
        <div class="sponsor-card mx-auto text-center">
            <a href="${sponsor.url}" target="_blank" rel="noopener">
                <img src="${sponsor.logo}" alt="${sponsor.name}" class="sponsor-logo mb-2">
                <div class="font-weight-bold">${sponsor.name}</div>
            </a>
        </div>
    `).join('')}</div>`;
}

function changeSponsorSlide(n) {
    clearInterval(sponsorInterval);
    showSponsorSlide(sponsorSlideIndex + n);
    startSponsorAutoSlide();
}

function startSponsorAutoSlide() {
    sponsorInterval = setInterval(() => {
        showSponsorSlide(sponsorSlideIndex + 1);
    }, 3500);
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('data/sponsors.json')
        .then(response => response.json())
        .then(data => {
            sponsorsData = data.sponsors;
            sponsorSlideIndex = 0;
            showSponsorSlide(sponsorSlideIndex);
            startSponsorAutoSlide();
        })
        .catch(error => {
            console.error('Error loading sponsors:', error);
        });
    // Expose changeSponsorSlide globally for button onclick
    window.changeSponsorSlide = changeSponsorSlide;
});
