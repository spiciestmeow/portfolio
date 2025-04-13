      function toggleWhatsAppPopup() {
        const popup = document.getElementById("whatsappPopup");
        popup.style.display =
          popup.style.display === "block" ? "none" : "block";
      }

      function openWhatsApp() {
        const phoneNumber = "+639956274340";
        const message = encodeURIComponent(
          "Hello, I'm interested in ClydeShop skins!"
        );
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, "_blank");

        document.getElementById("whatsappPopup").style.display = "none";
      }

      document.addEventListener("click", function (event) {
        const popup = document.getElementById("whatsappPopup");
        const whatsappButton = document.querySelector(".whatsapp-button");
        if (
          !popup.contains(event.target) &&
          !whatsappButton.contains(event.target) &&
          popup.style.display === "block"
        ) {
          popup.style.display = "none";
        }
      });
      function toggleTheme() {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", isLight ? "light" : "dark");
      }

      document.addEventListener("DOMContentLoaded", function () {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
          document.body.classList.add("light-mode");
        }
      });

      let currentCategory = "beginner";
      let currentSearchTerm = "";
      let currentFilter = "all";
      let currentTab = "team";

      document.addEventListener("DOMContentLoaded", function () {
        const freebiesPlayer = document.querySelector(
          '.player[onclick*="freebies"]'
        );
        if (freebiesPlayer) {
          setActivePlayer(freebiesPlayer, "freebies");
        }
        loadFreebies();
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
          document.body.style.overflow = sidebarContent.classList.contains(
            "hide"
          )
            ? "auto"
            : "hidden";
        }
      }

      function loadSkins(category) {
        const characterGrid = document.getElementById("character-grid");
        const freebiesSection = document.querySelector(".freebies-section");
        const contentHeaderContainer = document.querySelector(
          ".content-header-container"
        );
        const contentTitle = document.querySelector(
          ".content-title:not(.bronze-title):not(.gold-title)"
        );

        characterGrid.innerHTML = "";
        characterGrid.className = "character-grid";
        freebiesSection.style.display = "none";
        characterGrid.style.display = "grid";
        contentHeaderContainer.style.display = "block";

        contentTitle.textContent = `${
          category.charAt(0).toUpperCase() + category.slice(1)
        } Hero Skins`;
        document.querySelector(".search-bar").style.display = "flex";
        document.querySelector(".filter-options").style.display = "flex";
        const skins = skinData[category] || [];
        const searchTerm = currentSearchTerm.toLowerCase();

        skins.forEach((skin) => {
          if (searchTerm && !skin.name.toLowerCase().includes(searchTerm))
            return;
          if (currentFilter === "popular" && !skin.popular) return;
          const card = document.createElement("div");
          card.className = "character-card" + (skin.popular ? " popular" : "");
          card.innerHTML = `
                    <img src="${skin.image}" alt="${
            skin.name
          }" class="character-image" style="transform: translateX(${
            skin.position || 0
          }px) scale(${skin.scale || 1});">
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

      function loadFreebies() {
        const characterGrid = document.getElementById("character-grid");
        const freebiesSection = document.querySelector(".freebies-section");
        const bronzeGrid = document.getElementById("bronze-grid");
        const goldGrid = document.getElementById("gold-grid");
        const contentHeaderContainer = document.querySelector(
          ".content-header-container"
        );

        characterGrid.style.display = "none";
        contentHeaderContainer.style.display = "none";
        freebiesSection.style.display = "block";

        bronzeGrid.innerHTML = "";
        goldGrid.innerHTML = "";

        const freebies = skinData.freebies || [];

        const bronzeFreebies = freebies.filter(
          (freebie) => freebie.tier.toLowerCase() === "bronze"
        );
        bronzeFreebies.forEach((freebie) => {
          const card = document.createElement("div");
          card.className =
            "freebie-card" + (freebie.available ? "" : " locked");
          card.innerHTML = `
                    <img src="${freebie.image}" alt="${freebie.name}" class="freebie-image">
                    <div class="freebie-name-overlay"></div>
                    <div class="freebie-hero">${freebie.hero}</div>
                    <div class="freebie-name">${freebie.name}</div>
                `;
          bronzeGrid.appendChild(card);
        });

        const goldFreebies = freebies.filter(
          (freebie) => freebie.tier.toLowerCase() === "gold"
        );
        goldFreebies.forEach((freebie) => {
          const card = document.createElement("div");
          card.className =
            "freebie-card" + (freebie.available ? "" : " locked");
          card.innerHTML = `
                    <img src="${freebie.image}" alt="${freebie.name}" class="freebie-image">
                    <div class="freebie-name-overlay"></div>
                    <div class="freebie-hero">${freebie.hero}</div>
                    <div class="freebie-name">${freebie.name}</div>
                `;
          goldGrid.appendChild(card);
        });

        if (bronzeFreebies.length === 0) {
          bronzeGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 20px; color: rgba(255,255,255,0.5)">No Bronze freebies available</div>`;
        }
        if (goldFreebies.length === 0) {
          goldGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 20px; color: rgba(255,255,255,0.5)">No Gold freebies available</div>`;
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
            document.querySelector(".character-grid").className =
              "character-grid";
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
          if (category === "freebies") {
            loadFreebies();
          } else {
            loadSkins(category);
          }
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
          .forEach((el) => (el.style.display = "none"));
        tooltip.style.display = isVisible ? "none" : "block";
      }
