let slideIndex = 1;
let slideInterval;

const sliderImages = [
    'assets/imgs/slider/gallery-1.jpeg',
    'assets/imgs/slider/gallery-2.jpeg',
    'assets/imgs/slider/gallery-3.jpeg',
    'assets/imgs/slider/gallery-4.jpeg',
    'assets/imgs/slider/gallery-5.jpeg',
    'assets/imgs/slider/gallery-6.jpeg'
];

function initSlider() {
    const sliderHTML = `
        <div class="slider-container">
            ${sliderImages.map((img, index) => `
                <div class="slide ${index === 0 ? 'active' : ''}">
                    <img src="${img}" alt="Research Image ${index + 1}">
                </div>
            `).join('')}
            <button class="slider-arrow prev" onclick="changeSlide(-1)">
                <i class="ti-angle-left">←</i>
            </button>
            <button class="slider-arrow next" onclick="changeSlide(1)">
                <i class="ti-angle-right">→</i>
            </button>
            <div class="slider-dots">
                ${sliderImages.map((_, index) => `
                    <span class="dot ${index === 0 ? 'active' : ''}" onclick="currentSlide(${index + 1})"></span>
                `).join('')}
            </div>
        </div>
    `;
    
    const placeholder = document.getElementById('slider-placeholder');
    if (placeholder) {
        placeholder.innerHTML = sliderHTML;
    }
}

function showSlide(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

function changeSlide(n) {
    clearInterval(slideInterval);
    slideIndex += n;
    showSlide(slideIndex);
    startAutoSlide();
}

function currentSlide(n) {
    clearInterval(slideInterval);
    slideIndex = n;
    showSlide(slideIndex);
    startAutoSlide();
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000);
}

document.addEventListener('DOMContentLoaded', function () {
    initSlider();
    showSlide(slideIndex);
    startAutoSlide();
});
