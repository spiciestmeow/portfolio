const airdropData = {
  featured: [
    {
      name: "MANHWA",
      icon: "https://i.pinimg.com/736x/ae/d9/aa/aed9aa39285a2dfe5cceed3574a47a78.jpg",
      iconClass: "pharos-icon",
      status: "ACTIVE",
    },
    {
      name: "MANHUA",
      icon: "https://avatarfiles.alphacoders.com/366/thumb-350-366997.webp",
      iconClass: "chakra-icon",
      status: "ACTIVE",
    },
    {
      name: "MANGA",
      icon: "https://cdn-uploads.gameblog.fr/img/news/694552_681df8791ccb8.webp",
      iconClass: "gradient-icon",
      status: "ACTIVE",
    },
  ],
  gaming: [
    {
      name: "Honor of Kings",
      icon: "https://admin.esports.gg/wp-content/uploads/2024/06/channels4_profile.jpg",
      iconClass: "layerzero-icon",
      status: "ACTIVE",
    },
  ],
};

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 3 + 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

function createAirdropItem(data, index) {
  const item = document.createElement("div");
  item.className = "airdrop-item slide-in";
  item.style.animationDelay = index * 0.1 + "s";
  item.innerHTML = `
       <div class="airdrop-icon ${data.iconClass}">
      <img src="${data.icon}" alt="${data.name}" class="airdrop-icon-img" />
    </div>
    <span class="airdrop-name">${data.name}</span>
    <div class="active-label">${data.status}</div>
    `;
  return item;
}

function updateAirdropGrid(category) {
  const grid = document.getElementById("airdropGrid");
  const currentItems = grid.querySelectorAll(".airdrop-item");

  currentItems.forEach((item, index) => {
    item.style.animationDelay = index * 0.05 + "s";
    item.classList.add("slide-out");
  });

  setTimeout(() => {
    grid.innerHTML = "";

    const newData = airdropData[category] || airdropData.featured;
    const isNarrow = window.innerWidth <= 358;
    if (isNarrow) {
      grid.style.gridTemplateColumns = "1fr";
    } else {
      grid.style.gridTemplateColumns = "1fr 1fr";
    }

    newData.forEach((itemData, index) => {
      const newItem = createAirdropItem(itemData, index);
      grid.appendChild(newItem);

      newItem.addEventListener("click", function () {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      });
    });
  }, 400);
}

function addInteractions() {
  const exchangeItems = document.querySelectorAll(".exchange-item");
  exchangeItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 8px 25px rgba(0, 255, 0, 0.2)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.boxShadow = "none";
    });
  });

  const airdropItems = document.querySelectorAll(".airdrop-item");
  airdropItems.forEach((item, index) => {
    item.style.animationDelay = index * 0.1 + "s";
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  const airdropFilter = document.getElementById("airdropFilter");
  airdropFilter.addEventListener("change", function () {
    const selectedCategory = this.value;
    updateAirdropGrid(selectedCategory);
    this.classList.add("loading");
    setTimeout(() => {
      this.classList.remove("loading");
    }, 600);
  });

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.marginLeft = "-10px";
      ripple.style.marginTop = "-10px";
      this.style.position = "relative";
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  addInteractions();
  updateAirdropGrid("featured");
});

document.addEventListener("touchstart", function () {}, {
  passive: true,
});
