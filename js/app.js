/**
 * ============================================================
 *  FamuraTopUp — Homepage Logic (app.js)
 *  Handles: navbar, mobile menu, search, banner slider,
 *  game catalog filtering, and lazy loading.
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initSearch();
  initSlider();
  initCatalog();
  initLazyObserver();
});


// ═══════════════════════════════════════════════════════════
//  1. NAVBAR — Sticky + Scroll Effect
// ═══════════════════════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    // Add shadow on scroll
    if (currentScroll > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScroll = currentScroll;
  }, { passive: true });
}


// ═══════════════════════════════════════════════════════════
//  2. MOBILE MENU — Drawer Toggle
// ═══════════════════════════════════════════════════════════
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger-btn");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-overlay");
  const closeBtn = document.getElementById("close-drawer");

  if (!hamburger || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", openDrawer);
  overlay.addEventListener("click", closeDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
}


// ═══════════════════════════════════════════════════════════
//  3. SEARCH — Overlay & Game Filtering
// ═══════════════════════════════════════════════════════════
function initSearch() {
  const searchBtn = document.getElementById("search-btn");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchClose = document.getElementById("search-close");

  if (!searchBtn || !searchOverlay) return;

  function openSearch() {
    searchOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => searchInput?.focus(), 300);
  }

  function closeSearch() {
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "";
    if (searchInput) searchInput.value = "";
    if (searchResults) searchResults.innerHTML = "";
  }

  searchBtn.addEventListener("click", openSearch);
  if (searchClose) searchClose.addEventListener("click", closeSearch);

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      closeSearch();
    }
  });

  // Live search filtering
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.innerHTML = `<p class="text-gray-500 text-sm text-center py-4">Ketik minimal 2 huruf untuk mencari...</p>`;
        return;
      }

      const filtered = GAMES.filter(g =>
        g.name.toLowerCase().includes(query) ||
        g.developer.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        searchResults.innerHTML = `<p class="text-gray-500 text-sm text-center py-4">Game tidak ditemukan 😕</p>`;
        return;
      }

      searchResults.innerHTML = filtered.map(game => `
        <a href="order.html?game=${game.slug}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all">
          <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">${getGameIconSVG(game)}</div>
          <div>
            <div class="font-semibold text-sm">${game.name}</div>
            <div class="text-xs text-gray-500">${game.developer}</div>
          </div>
        </a>
      `).join("");
    });
  }
}


// ═══════════════════════════════════════════════════════════
//  4. BANNER SLIDER — Auto-play + Manual + Touch Swipe
// ═══════════════════════════════════════════════════════════
function initSlider() {
  const track = document.getElementById("slider-track");
  const dotsContainer = document.getElementById("slider-dots");
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll(".slider-slide");
  const totalSlides = slides.length;
  let currentSlide = 0;
  let autoSlideTimer;
  let touchStartX = 0;
  let touchEndX = 0;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = `slider-dot${i === 0 ? " active" : ""}`;
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    // Update dots
    dotsContainer.querySelectorAll(".slider-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }

  // Auto-slide every 5 seconds
  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  startAutoSlide();

  // Pause on hover
  const sliderContainer = track.parentElement;
  sliderContainer.addEventListener("mouseenter", stopAutoSlide);
  sliderContainer.addEventListener("mouseleave", startAutoSlide);

  // Touch swipe support
  sliderContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  sliderContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    startAutoSlide();
  }, { passive: true });

  // Arrow buttons
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
}


// ═══════════════════════════════════════════════════════════
//  5. GAME CATALOG — Render & Filter
// ═══════════════════════════════════════════════════════════
function initCatalog() {
  renderPopularGames();
  renderAllGames("semua");
  initCategoryTabs();
}

/**
 * Render the "🔥 Populer" section — only games with popular: true
 */
function renderPopularGames() {
  const container = document.getElementById("popular-games");
  if (!container) return;

  const popular = GAMES.filter(g => g.popular);
  container.innerHTML = popular.map((game, i) => createGameCard(game, i)).join("");
}

/**
 * Render the main game grid with category filter
 */
function renderAllGames(category) {
  const container = document.getElementById("all-games");
  if (!container) return;

  let filtered = GAMES;
  if (category !== "semua") {
    filtered = GAMES.filter(g => g.category === category);
  }

  container.innerHTML = filtered.map((game, i) => createGameCard(game, i)).join("");
}

/**
 * Create a single game card HTML
 */
function createGameCard(game, index) {
  return `
    <a href="order.html?game=${game.slug}" class="game-card animate-fade-in-up stagger-${Math.min(index + 1, 8)}" style="opacity:0">
      <div class="game-card-icon">${getGameIconSVG(game)}</div>
      <div>
        <div class="game-card-name">${game.name}</div>
        <div class="game-card-dev">${game.developer}</div>
      </div>
    </a>
  `;
}

/**
 * Category tab click handlers
 */
function initCategoryTabs() {
  const tabs = document.querySelectorAll(".category-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.dataset.category;
      renderAllGames(category);
    });
  });
}


// ═══════════════════════════════════════════════════════════
//  6. LAZY LOADING — IntersectionObserver for images
// ═══════════════════════════════════════════════════════════
function initLazyObserver() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (!lazyImages.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        img.classList.add("animate-fade-in");
        observer.unobserve(img);
      }
    });
  }, { rootMargin: "100px" });

  lazyImages.forEach(img => observer.observe(img));
}


// ═══════════════════════════════════════════════════════════
//  7. UTILITY — Scroll to element
// ═══════════════════════════════════════════════════════════
function scrollToElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
