// Navigation burger menu
// selectors
const navToggle = document.querySelector(".nav-icon");
const headerNav = document.querySelector(".header-nav");
const navMenu = headerNav.querySelector(".nav-menu");
const navLinks = headerNav.querySelector(".nav-links");

function openMobileNavbar() {
  headerNav.classList.add("opened");
  navToggle.setAttribute("aria-label", "Close navigation menu.");
}

function closeMobileNavbar() {
  headerNav.classList.remove("opened");
  navToggle.setAttribute("aria-label", "Open navigation menu.");
}

navToggle.addEventListener("click", () => {
  if (headerNav.classList.contains("opened")) {
    closeMobileNavbar();
  } else {
    openMobileNavbar();
  }
});
navLinks.addEventListener("click", (clickEvent) => {
  clickEvent.stopPropagation();
});

navMenu.addEventListener("click", closeMobileNavbar);

// Alert
function showAlert(message) {
  const div = document.createElement("div");
  div.className = "alert";
  const span = document.createElement("span");
  span.className = "alert-close-btn material-icons";
  span.innerHTML = "highlight_off";
  div.appendChild(document.createTextNode(message));
  div.appendChild(span);
  span.addEventListener("click", () => {
    this.parentElement.style.display = none;
  });
  const container = document.querySelector(".right-container");
  const form = document.querySelector(".new-todo-form");
  container.insertBefore(div, form);

  let close = document.getElementsByClassName("alert-close-btn");
  let i;

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.opacity = "0";
      setTimeout(function () {
        div.style.display = "none";
      }, 600);
    };
  }
  // Vanish in 3 sec
  setTimeout(() => {
    document.querySelector(".alert").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 300);
  }, 3000);
}

export default showAlert;