let currentCategory = "beginner";
let currentSearchTerm = "";
let currentFilter = "all";
let currentTab = "team";

document.addEventListener("DOMContentLoaded", function () {
  const beginnerPlayer = document.querySelector('.player[onclick*="beginner"]');
  if (beginnerPlayer) {
    setActivePlayer(beginnerPlayer, "beginner");
  }
  loadSkins("beginner");
  const firstCategory = document.querySelector(".shop-category");
  if (firstCategory) {
    firstCategory.classList.add("open");
    firstCategory.nextElementSibling.classList.add("show");
  }
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
});

function toggleSidebar() {
  const sidebarContent = document.querySelector(".sidebar-content");
  sidebarContent.classList.toggle("hide");

  if (window.innerWidth <= 767) {
    document.body.style.overflow = sidebarContent.classList.contains("hide")
      ? "auto"
      : "hidden";
  }
}

function loadSkins(category) {
  const characterGrid = document.getElementById("character-grid");
  characterGrid.innerHTML = "";
  characterGrid.className = "character-grid";
  const contentTitle = document.querySelector(".content-title");
  contentTitle.textContent = `${
    category.charAt(0).toUpperCase() + category.slice(1)
  } Hero Skins`;
  document.querySelector(".search-bar").style.display = "flex";
  document.querySelector(".filter-options").style.display = "flex";
  const skins = skinData[category] || [];
  const searchTerm = currentSearchTerm.toLowerCase();

  skins.forEach((skin) => {
    if (searchTerm && !skin.name.toLowerCase().includes(searchTerm)) return;
    if (currentFilter === "popular" && !skin.popular) return;
    const card = document.createElement("div");
    card.className = "character-card" + (skin.popular ? " popular" : "");
    card.innerHTML = `
                    <img src="${skin.image}" alt="${
      skin.name
    }" class="character-image" style="transform: translateX(${
      skin.position
    }px) scale(${skin.scale});">
                    <div class="character-price">${skin.price}</div>
                    ${
                      skin.tag
                        ? `<div class="character-tag">${skin.tag}</div>`
                        : ""
                    }
                    ${skin.popular ? `<div class="popular-badge"></div>` : ""}
                    <div class="character-name-overlay"></div>
                    <div class="hero-name">${skin.hero}</div>
                    <div class="character-name">${skin.name}</div>
                `;
    if (skin.popular) card.style.border = "2px solid #8a6effcc";
    characterGrid.appendChild(card);
  });

  if (characterGrid.children.length === 0) {
    const noResultsMsg = currentSearchTerm
      ? `No heroes found matching "${currentSearchTerm}" in this category`
      : "No heroes available in this category";
    characterGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 20px; color: rgba(255,255,255,0.5)">${noResultsMsg}</div>`;
  }
}

function loadTestimonials() {
  const characterGrid = document.getElementById("character-grid");
  characterGrid.innerHTML = "";
  characterGrid.className = "testimonials-container";
  const contentTitle = document.querySelector(".content-title");
  contentTitle.textContent = "Customer Reviews";
  document.querySelector(".search-bar").style.display = "none";
  document.querySelector(".filter-options").style.display = "none";

  testimonials.forEach((testimonial) => {
    const card = document.createElement("div");
    card.className =
      "testimonial-item" +
      (testimonial.featured ? " featured-testimonial" : "");
    card.innerHTML = `
                    ${
                      testimonial.featured
                        ? '<div class="featured-badge">Featured</div>'
                        : ""
                    }
                    <div class="testimonial-header">
                        <div class="testimonial-avatar">${
                          testimonial.initials
                        }</div>
                        <div>
                            <div class="testimonial-name">${
                              testimonial.name
                            }</div>
                            <div class="testimonial-purchase">${
                              testimonial.purchase
                            }</div>
                        </div>
                    </div>
                    <div class="testimonial-rating">${testimonial.rating}</div>
                    <div class="testimonial-text">${testimonial.text}</div>
                    <div class="testimonial-date">${testimonial.date}</div>
                `;
    characterGrid.appendChild(card);
  });
}

function setActiveFilter(element, filterType) {
  const filterOptions = document.querySelectorAll(".filter-option");
  filterOptions.forEach((option) => option.classList.remove("active"));
  element.classList.add("active");
  currentFilter = filterType;
  loadSkins(currentCategory);
}

const tabs = document.querySelectorAll(".sidebar-tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    const panels = document.querySelectorAll(".sidebar-panel");
    panels.forEach((panel) => panel.classList.remove("active"));
    const panelId = this.getAttribute("data-tab") + "-panel";
    if (panelId !== "reviews-panel") {
      document.getElementById(panelId).classList.add("active");
    }

    currentTab = this.getAttribute("data-tab");
    if (currentTab === "reviews") {
      loadTestimonials();
    } else if (currentTab === "team") {
      const beginnerPlayer = document.querySelector(
        '.player[onclick*="beginner"]'
      );
      if (beginnerPlayer) {
        setActivePlayer(beginnerPlayer, "beginner");
        loadSkins("beginner");
      }
    } else {
      document.querySelector(".character-grid").className = "character-grid";
      document.querySelector(".search-bar").style.display = "flex";
      document.querySelector(".filter-options").style.display = "flex";
    }
  });
});

function toggleCategory(category) {
  category.classList.toggle("open");
  const items = category.nextElementSibling;
  items.classList.toggle("show");
}

function setActivePlayer(player, category) {
  if (currentTab !== "reviews") {
    const players = document.querySelectorAll(".player");
    players.forEach((p) => p.classList.remove("player-active"));
    player.classList.add("player-active");
    currentCategory = category;
    loadSkins(category);
  }
}

function searchHeroes() {
  const searchInput = document.getElementById("hero-search");
  currentSearchTerm = searchInput.value.trim();

  loadSkins(currentCategory);
}

function toggleTooltip(id) {
  const tooltip = document.getElementById(id);
  const isVisible = tooltip.style.display === "block";
  document
    .querySelectorAll(".tooltip")
    .forEach((el) => (el.style.display = "none")); // close others
  tooltip.style.display = isVisible ? "none" : "block";
}
