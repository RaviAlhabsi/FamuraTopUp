/**
 * ============================================================
 *  FamuraTopUp — Supabase Client & Auth Logic (supabase-client.js)
 *  Memerlukan CDN script Supabase di HTML:
 *  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase-js.min.js"></script>
 * ============================================================
 */

// Supabase Configuration
const SUPABASE_URL = "https://ysepkpsdbtmnknfzghjo.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZXBrcHNkYnRtbmtuZnpnaGpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzQ2MTQsImV4cCI6MjA5NjkxMDYxNH0.BOtIHKg1GUJPXdOjtd-C0uDaNb1I5O80xv5SrEt6YM4";

// Inisialisasi Supabase dengan error handling
let supabaseClient = null;

try {
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.error("Supabase SDK belum dimuat! Pastikan CDN script sudah ditambahkan sebelum file ini.");
  }
} catch (e) {
  console.error("Gagal inisialisasi Supabase:", e);
}

/**
 * Mendapatkan User saat ini (jika sudah login)
 */
async function getCurrentUser() {
  if (!supabaseClient) return null;
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session ? session.user : null;
  } catch (e) {
    console.error("Gagal mendapatkan session:", e);
    return null;
  }
}

/**
 * Register
 */
async function signUp(email, password) {
  if (!supabaseClient) return { data: null, error: { message: "Supabase belum siap. Coba muat ulang halaman." } };
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });
  return { data, error };
}

/**
 * Login
 */
async function signIn(email, password) {
  if (!supabaseClient) return { data: null, error: { message: "Supabase belum siap. Coba muat ulang halaman." } };
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { data, error };
}

/**
 * Logout
 */
async function signOut() {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (!error) {
    window.location.reload();
  }
}

/**
 * Update UI Navbar Berdasarkan Status Login
 */
async function initAuthUI() {
  const user = await getCurrentUser();
  const navLinks = document.querySelectorAll(".nav-link");
  
  // Mencari elemen "Masuk" di desktop
  const desktopLoginBtn = Array.from(navLinks).find(el => el.textContent.trim().toLowerCase() === "masuk" || el.textContent.trim().toLowerCase() === "profil / riwayat");
  
  // Update Navbar Desktop
  if (desktopLoginBtn) {
    if (user) {
      desktopLoginBtn.textContent = "Profil / Riwayat";
      desktopLoginBtn.href = "riwayat.html";
      
      if (!document.getElementById("logout-btn-desktop")) {
        const logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.id = "logout-btn-desktop";
        logoutBtn.className = "nav-link text-red-400 hover:text-red-300";
        logoutBtn.textContent = "Keluar";
        logoutBtn.onclick = (e) => { e.preventDefault(); signOut(); };
        desktopLoginBtn.parentElement.appendChild(logoutBtn);
      }
    } else {
      desktopLoginBtn.textContent = "Masuk";
      desktopLoginBtn.href = "login.html";
    }
  }

  // Update Drawer Mobile
  const drawerLinks = document.querySelectorAll("#mobile-drawer a");
  const mobileLoginBtn = Array.from(drawerLinks).find(el => el.textContent.includes("Masuk"));
  
  if (mobileLoginBtn) {
    if (user) {
      mobileLoginBtn.innerHTML = "👤 Profil / Riwayat";
      mobileLoginBtn.href = "riwayat.html";
      
      if (!document.getElementById("logout-btn-mobile")) {
        const logoutBtn = document.createElement("a");
        logoutBtn.href = "#";
        logoutBtn.id = "logout-btn-mobile";
        logoutBtn.className = "block py-3 px-4 rounded-lg text-red-400 hover:bg-white/5 transition-all mt-2";
        logoutBtn.innerHTML = "🚪 Keluar";
        logoutBtn.onclick = (e) => { e.preventDefault(); signOut(); };
        mobileLoginBtn.parentElement.appendChild(logoutBtn);
      }
    } else {
      mobileLoginBtn.innerHTML = "👤 Masuk / Daftar";
      mobileLoginBtn.href = "login.html";
    }
  }
}

// Panggil initAuthUI ketika halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  initAuthUI();
});
