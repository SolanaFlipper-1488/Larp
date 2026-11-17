const seasons = ["Зима", "Весна", "Лето", "Осень"];
const slider = document.getElementById("season");
const seasonName = document.getElementById("season-name");
const scale = document.querySelectorAll(".season-scale span");

function showSeason() {
  const index = Number(slider.value) - 1;
  seasonName.textContent = seasons[index];
  scale.forEach(function (item, i) {
    item.classList.toggle("active", i === index);
  });
}

slider.addEventListener("input", showSeason);
showSeason();
