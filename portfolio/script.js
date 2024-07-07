const nav = document.querySelector(".navbar");
fetch("/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    nav.innerHTML = data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    eval(doc.querySelector("script").textContent);
  });
const footer = document.querySelector(".footer");
fetch("/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    eval(doc.querySelector("script").textContent);
  });
let currentIndexes = [0, 0, 0];

function showPage(projectIndex, pageIndex) {
  const project = document.getElementById(`project${projectIndex}`);
  const items = project.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  if (pageIndex >= totalItems) {
    currentIndexes[projectIndex - 1] = currentIndexes[projectIndex - 1];
  } else if (pageIndex < 0) {
    currentIndexes[projectIndex - 1] = currentIndexes[projectIndex - 1];
  } else {
    currentIndexes[projectIndex - 1] = pageIndex;
  }
  const offset = -currentIndexes[projectIndex - 1] * 100;
  project.querySelector(
    ".carousel-inner"
  ).style.transform = `translateX(${offset}%)`;
}

function nextPage(projectIndex) {
  showPage(projectIndex, currentIndexes[projectIndex - 1] + 1);
}

function prevPage(projectIndex) {
  showPage(projectIndex, currentIndexes[projectIndex - 1] - 1);
}

function showProject(projectIndex) {
  const projects = document.querySelectorAll(".project-carousel");
  projects.forEach((project, index) => {
    project.classList.remove("active");
    if (index === projectIndex - 1) {
      project.classList.add("active");
    }
  });

  const buttons = document.querySelectorAll(".sub-nav-btn");
  buttons.forEach((button, index) => {
    button.classList.remove("active");
    if (index === projectIndex - 1) {
      button.classList.add("active");
    }
  });
}

// Initialize the first project as active
showProject(1);

// Swipe functionality
function detectSwipe(element, projectIndex) {
  let touchStartX = 0;
  let touchEndX = 0;

  element.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  element.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX) {
      nextPage(projectIndex);
    }
    if (touchEndX > touchStartX) {
      prevPage(projectIndex);
    }
  }
}

const carousels = document.querySelectorAll(".project-carousel");
carousels.forEach((carousel, index) => {
  detectSwipe(carousel, index + 1);
});
