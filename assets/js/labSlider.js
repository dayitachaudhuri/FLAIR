let currentLabIndex = 0;
const labImages = [
    'assets/imgs/slider/gallery-1.jpeg',
    'assets/imgs/slider/gallery-2.jpeg',
    'assets/imgs/slider/gallery-3.jpeg',
    'assets/imgs/slider/gallery-4.jpeg',
    'assets/imgs/slider/gallery-5.jpeg',
    'assets/imgs/slider/gallery-6.jpeg'
];

const slidesToShow = 4;
const maxIndex = Math.max(0, labImages.length - slidesToShow);

function initLabSlider() {
    const sliderHTML = `
        <div class="slider-container">
            <div class="lab-slider-container">
                <div class="lab-slides-wrapper">
                    ${labImages.map((img, index) => `
                        <div class="lab-slide">
                            <img src="${img}" alt="Lab Image ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
            <button class="lab-slider-arrow prev" onclick="changeLabSlide(-1)">←</button>
            <button class="lab-slider-arrow next" onclick="changeLabSlide(1)">→</button>
        </div>
    `;
    
    document.getElementById('lab-slider-placeholder').innerHTML = sliderHTML;
}

function changeLabSlide(direction) {
    const wrapper = document.querySelector('.lab-slides-wrapper');
    
    currentLabIndex += direction;
    
    // Loop around
    if (currentLabIndex < 0) {
        currentLabIndex = maxIndex;
    } else if (currentLabIndex > maxIndex) {
        currentLabIndex = 0;
    }
    
    const translateX = -(currentLabIndex * 25); // 25% per slide (100% / 4 images)
    wrapper.style.transform = `translateX(${translateX}%)`;
}

document.addEventListener('DOMContentLoaded', initLabSlider);
