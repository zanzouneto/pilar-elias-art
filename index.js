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
  if (index === 0) {
    prevButton.setAttribute("disabled", "true");
  } else {
    prevButton.removeAttribute("disabled");
  }

  // Disable nextButton on the last slide
  if (index === items.length - 1) {
    nextButton.setAttribute("disabled", "true");
  } else {
    nextButton.removeAttribute("disabled");
  }
}

prevButton.addEventListener("click", () => {
  currentIndex = currentIndex - 1;
  if (currentIndex < 0) {
    currentIndex = carousel.children.length - 1;
  }
  scrollToItem(currentIndex);
  updateCurrentSlide(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = currentIndex + 1;
  if (currentIndex >= carousel.children.length) {
    currentIndex = 0;
  }
  scrollToItem(currentIndex);
  updateCurrentSlide(currentIndex);
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
      currentIndex = carousel.children.length - 1;
    }
    scrollToItem(currentIndex);
    updateCurrentSlide(currentIndex);
  } else if (e.key === "ArrowRight") {
    currentIndex = currentIndex + 1;
    if (currentIndex >= carousel.children.length) {
      currentIndex = 0;
    }
    scrollToItem(currentIndex);
    updateCurrentSlide(currentIndex);
  }
});

function scrollToItem(index) {
  const item = carousel.children[index];
  const vw = window.innerWidth; // Get the viewport width
  const scrollLeft = item.offsetLeft - vw * 0.025; // Adjusted for 95vw

  setTimeout(() => {
    carousel.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, 200);
}

// Initialize the current slide
updateCurrentSlide(currentIndex);

function scrollToItem(index) {
  const vw = window.innerWidth; // Get the viewport width
  let scrollAmount;

  if (vw <= 800) { // Assuming 800px is your breakpoint for mobile view
      scrollAmount = 0.95 * vw * index; // Adjusted for 95vw on smaller screens
  } 

  setTimeout(() => {
      carousel.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
      });
  }, 200);
}
