const carousel = document.querySelector(".carousel");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentIndex = 0;

// Function to update the current slide
function updateCurrentSlide(index) {
    const items = document.querySelectorAll(".carousel-item");
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add("current");
        } else {
            item.classList.remove("current");
        }
    });

    // Disable prevButton on the first slide
    prevButton.disabled = index === 0;

    // Disable nextButton on the last slide
    nextButton.disabled = index === items.length - 1;
}

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
    scrollToItem(currentIndex);
    updateCurrentSlide(currentIndex);
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % carousel.children.length;
    scrollToItem(currentIndex);
    updateCurrentSlide(currentIndex);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
    } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % carousel.children.length;
    }
    scrollToItem(currentIndex);
    updateCurrentSlide(currentIndex);
});

function scrollToItem(index) {
    const vw = window.innerWidth; // Get the viewport width
    let scrollAmount;

    if (vw <= 800) { // Assuming 800px is your breakpoint for mobile view
        scrollAmount = 0.95 * vw * index; // Adjusted for 95vw on smaller screens
    } else {
        scrollAmount = carousel.children[index].offsetLeft;
    }

    carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
}

// Initialize the current slide
updateCurrentSlide(currentIndex);
