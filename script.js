lottie.loadAnimation({
  container: document.getElementById("lottie-animation"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/animation.json",
});

// For Sub Nav for technologies
function showContent(technology, event) {
  if (event) {
    event.preventDefault();
  }

  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => {
    content.classList.remove("active");
    content.style.opacity = 0;
  });

  const selectedContent = document.getElementById(technology);
  if (selectedContent) {
    selectedContent.classList.add("active");

    setTimeout(() => {
      selectedContent.style.opacity = 1;
    }, 50);
  }

  const links = document.querySelectorAll(".sub-navbar a");
  links.forEach((link) => {
    link.classList.remove("active");
  });

  if (event) {
    event.target.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showContent("backend");
  const defaultLink = document.querySelector(".sub-navbar a");
  if (defaultLink) {
    defaultLink.classList.add("active");
  }
});
