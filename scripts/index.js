document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = slider.querySelectorAll("a");
  let currentIndex = 0;


  const controls = document.createElement("div");
  controls.classList.add("slider-controls");

  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&larr;";
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&rarr;";

  controls.appendChild(prevButton);
  controls.appendChild(nextButton);
  slider.appendChild(controls);


  function updateSlides(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }


  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateSlides(currentIndex);
  });


  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlides(currentIndex);
  });


  setInterval(() => {
    nextButton.click();
  }, 5000);

  updateSlides(currentIndex);
});



function scrollToSection(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}
