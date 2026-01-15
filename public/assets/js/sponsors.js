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
    wrapper.innerHTML = `<div class="w-full flex justify-center gap-6 flex-wrap">${cards.map(sponsor => `
        <div class="bg-white rounded-xl p-6 w-[220px] min-h-[150px] flex flex-col items-center transition-shadow duration-300 hover:shadow-lg">
            <a href="${sponsor.url}" target="_blank" rel="noopener" class="flex flex-col items-center text-center">
                <img src="${sponsor.logo}" alt="${sponsor.name}" class="w-[100px] h-[100px] object-contain mb-2 rounded-lg">
                <div class="font-semibold text-gray-800">${sponsor.name}</div>
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
    fetch('/data/sponsors.json')
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
