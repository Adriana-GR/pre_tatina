class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector(".hamburger-menu");
    this.menuList = document.querySelectorAll(".menu-list");
    this.hamburgerIcon = document.querySelector(".hamburger-menu i");

    this.initEventListeners();
  }

  initEventListeners() {
    this.menuIcon.addEventListener("click", () => this.toggleMenu());
  }

  toggleMenu() {
    this.hamburgerIcon.classList.toggle("fa-bars");
    this.hamburgerIcon.classList.toggle("fa-xmark");
    this.menuList.forEach((menuItem) => {
      menuItem.style.display = this.hamburgerIcon.classList.contains("fa-bars")
        ? "none"
        : "block";
    });
  }
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "sk", // Default is Slovak
      autoDisplay: false, // Prevent automatic dropdown
    },
    "google_translate_element"
  );
}

function changeLanguage(lang) {
  let select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  } else {
    alert("Prekladač sa ešte nenačítal. Skúste znova.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = new MobileMenu();
});

class ToggleContent {
  constructor(section) {
    this.section = section;
    this.button = section.querySelector("button");
    this.paragraph = section.querySelector("p");
    this.init();
  }

  // Initialize by adding the click event listener
  init() {
    this.section.addEventListener("click", () => this.toggleParagraph());
  }

  // Toggle the display of the paragraph
  toggleParagraph() {
    if (this.paragraph.style.display === "block") {
      this.paragraph.style.display = "none"; // Hide paragraph
    } else {
      this.paragraph.style.display = "block"; // Show paragraph
    }
  }
}

// Initialize ToggleContent for each section
document.querySelectorAll("section").forEach((section) => {
  new ToggleContent(section); // Create a new instance for each section
});

class MapHandler {
  constructor(address) {
    this.address = address;
    this.map = null;
    this.init();
  }

  async fetchCoordinates() {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      this.address
    )}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.length > 0 ? { lat: data[0].lat, lon: data[0].lon } : null;
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  }

  async init() {
    const coordinates = await this.fetchCoordinates();
    if (coordinates) {
      this.loadMap(coordinates.lat, coordinates.lon);
    } else {
      alert("Location not found");
    }
  }

  loadMap(lat, lon) {
    this.map = L.map("map").setView([lat, lon], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);
    this.addMarker(lat, lon);
  }

  addMarker(lat, lon) {
    L.marker([lat, lon]).addTo(this.map).bindPopup(this.address).openPopup();
  }
}

new MapHandler("Myslenická 1/E, 902 03 Pezinok");
