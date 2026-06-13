/**
 * ============================================================
 *  FamuraTopUp — Order Page Logic (order.js)
 *  Handles: Game loading, nominal selection, payment selection,
 *  promo code, WhatsApp input, validation, and sticky bar.
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const slug = getUrlParam("game");
  if (!slug) {
    window.location.href = "index.html";
    return;
  }

  const game = getGameBySlug(slug);
  if (!game) {
    window.location.href = "index.html";
    return;
  }

  // Store current order state
  window.orderState = {
    game: game,
    selectedItem: null,
    selectedPayment: null,
    promoCode: null,
    promoDiscount: 0,
    whatsapp: "",
    userId: "",
    zoneId: "",
  };

  renderGameHeader(game);
  renderAccountFields(game);
  renderNominals(game);
  renderPaymentMethods();
  initPromoCode();
  initWhatsappInput();
  initStickyBar();
  initBuyButton();
});


// ═══════════════════════════════════════════════════════════
//  UTILITY: Get URL parameter
// ═══════════════════════════════════════════════════════════
function getUrlParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}


// ═══════════════════════════════════════════════════════════
//  1. GAME HEADER — Banner & Info
// ═══════════════════════════════════════════════════════════
function renderGameHeader(game) {
  const container = document.getElementById("game-header");
  if (!container) return;

  container.innerHTML = `
    <div class="relative rounded-2xl overflow-hidden" style="background: linear-gradient(135deg, ${game.color}30, ${game.color}10)">
      <div class="p-5 sm:p-6 flex items-center gap-4">
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
          ${getGameIconSVG(game)}
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="text-xl sm:text-2xl font-bold text-white mb-1">${game.name}</h1>
          <p class="text-sm text-gray-400 mb-3">${game.developer}</p>
          <div class="flex flex-wrap gap-2">
            <span class="feature-badge">⚡ Proses Instan</span>
            <span class="feature-badge">💬 CS 24/7</span>
            <span class="feature-badge">🔒 Aman</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Update page title
  document.title = `${game.name} — FamuraTopUp`;
}


// ═══════════════════════════════════════════════════════════
//  2. STEP 1: Account Fields
// ═══════════════════════════════════════════════════════════
function renderAccountFields(game) {
  const container = document.getElementById("account-fields");
  if (!container) return;

  if (game.fields.length === 0) {
    // No account fields needed (e.g., voucher products)
    container.closest(".step-section").style.display = "none";
    return;
  }

  let fieldsHTML = game.fields.map(field => {
    if (field.type === "select") {
      return `
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">${field.label}</label>
          <select id="field-${field.name}" class="form-input form-select" required>
            <option value="" disabled selected>${field.placeholder}</option>
            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
          </select>
        </div>
      `;
    }
    return `
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">${field.label}</label>
        <input type="${field.type}" id="field-${field.name}" class="form-input" placeholder="${field.placeholder}" required>
      </div>
    `;
  }).join("");

  // Add help text
  fieldsHTML += `
    <div class="info-box mt-3">
      <span class="text-lg">💡</span>
      <span>${game.helpText}</span>
    </div>
  `;

  container.innerHTML = fieldsHTML;

  // Add real-time validation listeners
  game.fields.forEach(field => {
    const input = document.getElementById(`field-${field.name}`);
    if (input) {
      input.addEventListener("input", () => {
        window.orderState[field.name] = input.value;
        validateField(input);
        updateBuyButton();
      });
      input.addEventListener("change", () => {
        window.orderState[field.name] = input.value;
        validateField(input);
        updateBuyButton();
      });
    }
  });
}

function validateField(input) {
  if (input.value.trim()) {
    input.classList.remove("error");
    return true;
  } else {
    input.classList.add("error");
    return false;
  }
}


// ═══════════════════════════════════════════════════════════
//  3. STEP 2: Nominals
// ═══════════════════════════════════════════════════════════
function renderNominals(game) {
  const container = document.getElementById("nominal-grid");
  const tabsContainer = document.getElementById("nominal-tabs");
  if (!container) return;

  // Extract unique categories
  const categories = [...new Set(game.items.map(item => item.category))];

  // Render category sub-tabs if multiple categories
  if (tabsContainer && categories.length > 1) {
    tabsContainer.innerHTML = `
      <button class="category-tab active" data-nominal-cat="semua" style="font-size:0.78rem; padding:6px 14px;">Semua</button>
      ${categories.map(cat => `
        <button class="category-tab" data-nominal-cat="${cat}" style="font-size:0.78rem; padding:6px 14px;">
          ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      `).join("")}
    `;

    // Tab click handlers
    tabsContainer.querySelectorAll(".category-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        tabsContainer.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const cat = tab.dataset.nominalCat;
        renderNominalCards(game, cat === "semua" ? null : cat);
      });
    });
  }

  // Render all nominals initially
  renderNominalCards(game, null);
}

function renderNominalCards(game, category) {
  const container = document.getElementById("nominal-grid");
  if (!container) return;

  let items = game.items;
  if (category) {
    items = items.filter(item => item.category === category);
  }

  container.innerHTML = items.map(item => `
    <div class="nominal-card" data-item-id="${item.id}" onclick="selectNominal('${item.id}')">
      <div class="item-name">${item.name}</div>
      <div class="item-price">${formatRupiah(item.price)}</div>
    </div>
  `).join("");

  // Re-select if already selected
  if (window.orderState.selectedItem) {
    const selected = container.querySelector(`[data-item-id="${window.orderState.selectedItem.id}"]`);
    if (selected) selected.classList.add("selected");
  }
}

function selectNominal(itemId) {
  const game = window.orderState.game;
  const item = game.items.find(i => i.id === itemId);
  if (!item) return;

  window.orderState.selectedItem = item;

  // Update visual selection
  document.querySelectorAll(".nominal-card").forEach(card => {
    card.classList.remove("selected");
  });
  const selectedCard = document.querySelector(`[data-item-id="${itemId}"]`);
  if (selectedCard) selectedCard.classList.add("selected");

  updateStickyBar();
  updateBuyButton();
}


// ═══════════════════════════════════════════════════════════
//  4. STEP 3: Payment Methods
// ═══════════════════════════════════════════════════════════
function renderPaymentMethods() {
  const container = document.getElementById("payment-methods");
  if (!container) return;

  container.innerHTML = PAYMENT_METHODS.map((group, gIdx) => `
    <div class="payment-group ${gIdx === 0 ? 'open' : ''}" id="pg-${gIdx}">
      <!-- Group Header (Accordion toggle) -->
      <div class="payment-group-header" onclick="togglePaymentGroup(${gIdx})">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 flex items-center justify-center">
            ${PAYMENT_ICONS[group.methods[0].icon] || ""}
          </div>
          <span class="font-semibold text-sm text-white">${group.group}</span>
          ${group.badge ? `<span class="badge badge-green">${group.badge}</span>` : ""}
        </div>
        <svg class="chevron-icon w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      <!-- Group Body (Methods) -->
      <div class="payment-group-body">
        ${group.methods.map(method => `
          <div class="payment-method relative" data-payment-id="${method.id}" onclick="selectPayment('${method.id}')">
            <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
              ${PAYMENT_ICONS[method.icon] || ""}
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-white">${method.name}</div>
              ${method.fee > 0 ? `<div class="text-xs text-gray-500">+${formatRupiah(method.fee)} biaya admin</div>` : `<div class="text-xs text-green-400">Tanpa biaya admin</div>`}
            </div>
            <div class="payment-check hidden">
              <svg class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function togglePaymentGroup(index) {
  const group = document.getElementById(`pg-${index}`);
  if (group) group.classList.toggle("open");
}

function selectPayment(paymentId) {
  // Find the payment method from data
  let selectedMethod = null;
  for (const group of PAYMENT_METHODS) {
    const method = group.methods.find(m => m.id === paymentId);
    if (method) { selectedMethod = method; break; }
  }
  if (!selectedMethod) return;

  window.orderState.selectedPayment = selectedMethod;

  // Update visual selection
  document.querySelectorAll(".payment-method").forEach(pm => {
    pm.classList.remove("selected");
    pm.querySelector(".payment-check")?.classList.add("hidden");
  });
  const selectedEl = document.querySelector(`[data-payment-id="${paymentId}"]`);
  if (selectedEl) {
    selectedEl.classList.add("selected");
    selectedEl.querySelector(".payment-check")?.classList.remove("hidden");
  }

  updateStickyBar();
  updateBuyButton();
}


// ═══════════════════════════════════════════════════════════
//  5. STEP 4: Promo Code
// ═══════════════════════════════════════════════════════════
function initPromoCode() {
  const promoInput = document.getElementById("promo-input");
  const promoBtn = document.getElementById("promo-btn");
  const promoResult = document.getElementById("promo-result");

  if (!promoBtn || !promoInput) return;

  promoBtn.addEventListener("click", () => {
    const code = promoInput.value.trim().toUpperCase();
    if (!code) return;

    // Demo promo codes
    const promoCodes = {
      "FAMURA10": { discount: 10, type: "percent" },
      "DISKON5K": { discount: 5000, type: "fixed" },
      "NEWUSER": { discount: 15, type: "percent" },
    };

    if (promoCodes[code]) {
      const promo = promoCodes[code];
      window.orderState.promoCode = code;

      if (promo.type === "percent") {
        window.orderState.promoDiscount = promo.discount;
        promoResult.innerHTML = `<span class="text-green-400 text-sm">✅ Promo ${code} berhasil! Diskon ${promo.discount}%</span>`;
      } else {
        window.orderState.promoDiscount = promo.discount;
        promoResult.innerHTML = `<span class="text-green-400 text-sm">✅ Promo ${code} berhasil! Diskon ${formatRupiah(promo.discount)}</span>`;
      }
      showToast("Kode promo berhasil digunakan!", "success");
    } else {
      window.orderState.promoCode = null;
      window.orderState.promoDiscount = 0;
      promoResult.innerHTML = `<span class="text-red-400 text-sm">❌ Kode promo tidak valid</span>`;
      showToast("Kode promo tidak valid", "error");
    }

    updateStickyBar();
  });
}


// ═══════════════════════════════════════════════════════════
//  6. STEP 5: WhatsApp Input
// ═══════════════════════════════════════════════════════════
function initWhatsappInput() {
  const waInput = document.getElementById("wa-input");
  if (!waInput) return;

  waInput.addEventListener("input", (e) => {
    // Allow only numbers
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    window.orderState.whatsapp = e.target.value;
    updateBuyButton();
  });
}


// ═══════════════════════════════════════════════════════════
//  7. STICKY BOTTOM BAR
// ═══════════════════════════════════════════════════════════
function initStickyBar() {
  const stickyBar = document.getElementById("sticky-bar");
  if (!stickyBar) return;

  // Show sticky bar when user scrolls past the nominal section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && window.orderState.selectedItem) {
        stickyBar.classList.add("visible");
      } else {
        stickyBar.classList.remove("visible");
      }
    });
  }, { threshold: 0.1 });

  const nominalSection = document.getElementById("step-2");
  if (nominalSection) observer.observe(nominalSection);
}

function updateStickyBar() {
  const stickyBar = document.getElementById("sticky-bar");
  const stickyItemName = document.getElementById("sticky-item-name");
  const stickyTotal = document.getElementById("sticky-total");

  if (!stickyBar) return;

  const item = window.orderState.selectedItem;
  const payment = window.orderState.selectedPayment;

  if (item) {
    stickyBar.classList.add("visible");

    let total = item.price;
    if (payment) total += payment.fee;

    // Apply promo
    if (window.orderState.promoDiscount > 0 && window.orderState.promoCode) {
      const promoCodes = { "FAMURA10": "percent", "DISKON5K": "fixed", "NEWUSER": "percent" };
      const type = promoCodes[window.orderState.promoCode] || "fixed";
      if (type === "percent") {
        total = total - (total * window.orderState.promoDiscount / 100);
      } else {
        total = total - window.orderState.promoDiscount;
      }
      if (total < 0) total = 0;
    }

    if (stickyItemName) stickyItemName.textContent = item.name;
    if (stickyTotal) stickyTotal.textContent = formatRupiah(Math.round(total));
  }
}


// ═══════════════════════════════════════════════════════════
//  8. BUY BUTTON — Validation & Confirmation Modal
// ═══════════════════════════════════════════════════════════
function initBuyButton() {
  const buyBtn = document.getElementById("buy-btn");
  const buyBtnSticky = document.getElementById("buy-btn-sticky");

  if (buyBtn) buyBtn.addEventListener("click", handleBuy);
  if (buyBtnSticky) buyBtnSticky.addEventListener("click", handleBuy);
}

function updateBuyButton() {
  const buyBtn = document.getElementById("buy-btn");
  const buyBtnSticky = document.getElementById("buy-btn-sticky");
  const isValid = isOrderValid();

  if (buyBtn) buyBtn.disabled = !isValid;
  if (buyBtnSticky) buyBtnSticky.disabled = !isValid;
}

function isOrderValid() {
  const state = window.orderState;

  // Check account fields
  for (const field of state.game.fields) {
    const input = document.getElementById(`field-${field.name}`);
    if (input && !input.value.trim()) return false;
  }

  // Check nominal selection
  if (!state.selectedItem) return false;

  // Check payment selection
  if (!state.selectedPayment) return false;

  // Check WhatsApp
  if (!state.whatsapp || state.whatsapp.length < 10) return false;

  return true;
}

function handleBuy() {
  if (!isOrderValid()) {
    showToast("Mohon lengkapi semua data!", "error");

    // Scroll to first empty required field
    const state = window.orderState;
    for (const field of state.game.fields) {
      const input = document.getElementById(`field-${field.name}`);
      if (input && !input.value.trim()) {
        input.classList.add("error");
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        input.focus();
        return;
      }
    }
    if (!state.selectedItem) {
      document.getElementById("step-2")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!state.selectedPayment) {
      document.getElementById("step-3")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    return;
  }

  // Show confirmation modal
  showConfirmationModal();
}

function showConfirmationModal() {
  const state = window.orderState;
  const item = state.selectedItem;
  const payment = state.selectedPayment;

  let total = item.price + payment.fee;

  // Apply promo
  let discountText = "";
  if (state.promoDiscount > 0 && state.promoCode) {
    const promoCodes = { "FAMURA10": "percent", "DISKON5K": "fixed", "NEWUSER": "percent" };
    const type = promoCodes[state.promoCode] || "fixed";
    let discountAmount = 0;
    if (type === "percent") {
      discountAmount = Math.round(total * state.promoDiscount / 100);
      discountText = `Diskon (${state.promoCode} -${state.promoDiscount}%)`;
    } else {
      discountAmount = state.promoDiscount;
      discountText = `Diskon (${state.promoCode})`;
    }
    total -= discountAmount;
    if (total < 0) total = 0;
  }

  // Build account info
  let accountInfo = "";
  state.game.fields.forEach(field => {
    const input = document.getElementById(`field-${field.name}`);
    if (input) accountInfo += `<div class="flex justify-between py-1"><span class="text-gray-400">${field.label}</span><span class="font-medium">${input.value}</span></div>`;
  });

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-body");

  if (modal && modalContent) {
    modalContent.innerHTML = `
      <div class="text-center mb-4">
        <div class="w-14 h-14 mx-auto mb-3 rounded-xl overflow-hidden">${getGameIconSVG(state.game)}</div>
        <h3 class="text-lg font-bold">Konfirmasi Pesanan</h3>
        <p class="text-sm text-gray-400">${state.game.name}</p>
      </div>

      <div class="space-y-1 text-sm mb-4 border-t border-b border-gray-700/50 py-3">
        ${accountInfo}
        <div class="flex justify-between py-1"><span class="text-gray-400">Item</span><span class="font-medium">${item.name}</span></div>
        <div class="flex justify-between py-1"><span class="text-gray-400">Pembayaran</span><span class="font-medium">${payment.name}</span></div>
        <div class="flex justify-between py-1"><span class="text-gray-400">WhatsApp</span><span class="font-medium">+62${state.whatsapp}</span></div>
      </div>

      <div class="space-y-1 text-sm mb-4">
        <div class="flex justify-between py-1"><span class="text-gray-400">Harga</span><span>${formatRupiah(item.price)}</span></div>
        ${payment.fee > 0 ? `<div class="flex justify-between py-1"><span class="text-gray-400">Biaya Admin</span><span>${formatRupiah(payment.fee)}</span></div>` : ""}
        ${discountText ? `<div class="flex justify-between py-1"><span class="text-green-400">${discountText}</span><span class="text-green-400">-${formatRupiah(total < item.price + payment.fee ? (item.price + payment.fee - total) : 0)}</span></div>` : ""}
        <div class="flex justify-between py-2 border-t border-gray-700/50 font-bold text-base">
          <span>Total</span>
          <span class="gradient-text">${formatRupiah(Math.round(total))}</span>
        </div>
      </div>

      <div class="flex gap-3">
        <button onclick="closeModal()" class="btn-secondary flex-1">Batal</button>
        <button onclick="processOrder()" class="btn-primary flex-1">Bayar Sekarang</button>
      </div>
    `;

    modal.classList.add("active");
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("active");
}

async function processOrder() {
  closeModal();

  // Generate a fake invoice number
  const invoiceNum = "INV" + Date.now().toString().slice(-10);

  const state = window.orderState;
  const item = state.selectedItem;
  const payment = state.selectedPayment;
  let total = item.price + payment.fee;
  
  if (state.promoDiscount > 0 && state.promoCode) {
    const promoCodes = { "FAMURA10": "percent", "DISKON5K": "fixed", "NEWUSER": "percent" };
    const type = promoCodes[state.promoCode] || "fixed";
    if (type === "percent") {
      total = Math.round(total - (total * state.promoDiscount / 100));
    } else {
      total = total - state.promoDiscount;
    }
    if (total < 0) total = 0;
  }

  // Save to Supabase if user is logged in
  if (window.supabase) {
    try {
      const { data: { session } } = await window.supabase.auth.getSession();
      if (session && session.user) {
        await window.supabase.from("transactions").insert([{
          user_id: session.user.id,
          invoice: invoiceNum,
          game: state.game.name,
          item: item.name,
          price: total,
          status: "success", // Directly mark as success for demo purposes
        }]);
      }
    } catch (e) {
      console.error("Gagal menyimpan transaksi ke Supabase:", e);
    }
  }

  showToast(`Pesanan berhasil dibuat! Invoice: ${invoiceNum}`, "success");

  // In production, this would redirect to payment gateway
  setTimeout(async () => {
    showToast("Mengarahkan ke halaman pembayaran...", "info");
    
    // Redirect to riwayat if logged in
    if (window.supabase) {
      const { data: { session } } = await window.supabase.auth.getSession();
      if (session && session.user) {
        window.location.href = "riwayat.html";
      }
    }
  }, 2000);
}


// ═══════════════════════════════════════════════════════════
//  TOAST NOTIFICATION
// ═══════════════════════════════════════════════════════════
function showToast(message, type = "info") {
  // Remove existing toasts
  document.querySelectorAll(".toast").forEach(t => t.remove());

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
