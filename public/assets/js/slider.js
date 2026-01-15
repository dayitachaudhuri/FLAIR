let slideIndex = 1;
let slideInterval;

function showSlide(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Fade out all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].style.opacity = "0";
        slides[i].style.zIndex = "0";
    }

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
        dots[i].classList.remove("bg-white");
        dots[i].classList.add("bg-white/50");
    }

    // Fade in active slide
    slides[slideIndex - 1].classList.add("active");
    slides[slideIndex - 1].style.opacity = "1";
    slides[slideIndex - 1].style.zIndex = "1";
    
    // Highlight active dot
    dots[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.remove("bg-white/50");
    dots[slideIndex - 1].classList.add("bg-white");
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
    showSlide(slideIndex);
    startAutoSlide();
});
