const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle"),
      sidebar = body.querySelector("nav"),
      sidebarToggle = body.querySelector(".sidebar-toggle");

let mode = localStorage.getItem("mode");
let status = localStorage.getItem("status");

if (mode === "dark") {
  body.classList.add("dark");
}
if (status === "close") {
  sidebar.classList.add("close");
}

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("mode", body.classList.contains("dark") ? "dark" : "light");
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  localStorage.setItem("status", sidebar.classList.contains("close") ? "close" : "open");
});