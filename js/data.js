/**
 * ============================================================
 *  FamuraTopUp — Data Store (data.js)
 *  Berisi seluruh data game, nominal, payment methods,
 *  dan dummy transactions untuk demo.
 * ============================================================
 */

// ─── Game Catalog ───────────────────────────────────────────
const GAMES = [
  {
    id: 1,
    name: "Mobile Legends",
    slug: "mobile-legends",
    developer: "Moonton",
    category: "mobile",
    popular: true,
    icon: "assets/images/Gamelogo/mole.webp",
    banner: "assets/images/Gamelogo/mole.webp",
    color: "#4F7CF7",
    fields: [
      { name: "userId", label: "User ID", placeholder: "Masukkan User ID", type: "text" },
      { name: "zoneId", label: "Zone ID", placeholder: "Masukkan Zone ID", type: "text" }
    ],
    helpText: "Buka game → Profil → User ID & Zone ID terletak di bawah avatar.",
    items: [
      { id: "ml-86", name: "86 Diamonds", amount: 86, price: 19000, category: "diamonds" },
      { id: "ml-172", name: "172 Diamonds", amount: 172, price: 37000, category: "diamonds" },
      { id: "ml-257", name: "257 Diamonds", amount: 257, price: 55000, category: "diamonds" },
      { id: "ml-344", name: "344 Diamonds", amount: 344, price: 72000, category: "diamonds" },
      { id: "ml-429", name: "429 Diamonds", amount: 429, price: 89000, category: "diamonds" },
      { id: "ml-514", name: "514 Diamonds", amount: 514, price: 106000, category: "diamonds" },
      { id: "ml-706", name: "706 Diamonds", amount: 706, price: 140000, category: "diamonds" },
      { id: "ml-878", name: "878 Diamonds", amount: 878, price: 172000, category: "diamonds" },
      { id: "ml-1050", name: "1050 Diamonds", amount: 1050, price: 204000, category: "diamonds" },
      { id: "ml-1412", name: "1412 Diamonds", amount: 1412, price: 271000, category: "diamonds" },
      { id: "ml-2010", name: "2010 Diamonds", amount: 2010, price: 381000, category: "diamonds" },
      { id: "ml-wp", name: "Weekly Pass", amount: 1, price: 28000, category: "pass" },
      { id: "ml-twl", name: "Twilight Pass", amount: 1, price: 150000, category: "pass" },
    ]
  },
  {
    id: 2,
    name: "Free Fire",
    slug: "free-fire",
    developer: "Garena",
    category: "mobile",
    popular: true,
    icon: "assets/images/Gamelogo/free fire.jpg",
    banner: "assets/images/Gamelogo/free fire.jpg",
    color: "#FF6B35",
    fields: [
      { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID", type: "text" }
    ],
    helpText: "Buka game → Profil → Player ID terletak di pojok kiri atas.",
    items: [
      { id: "ff-50", name: "50 Diamonds", amount: 50, price: 7500, category: "diamonds" },
      { id: "ff-100", name: "100 Diamonds", amount: 100, price: 15000, category: "diamonds" },
      { id: "ff-210", name: "210 Diamonds", amount: 210, price: 30000, category: "diamonds" },
      { id: "ff-310", name: "310 Diamonds", amount: 310, price: 44000, category: "diamonds" },
      { id: "ff-520", name: "520 Diamonds", amount: 520, price: 73000, category: "diamonds" },
      { id: "ff-720", name: "720 Diamonds", amount: 720, price: 100000, category: "diamonds" },
      { id: "ff-1060", name: "1060 Diamonds", amount: 1060, price: 145000, category: "diamonds" },
      { id: "ff-2180", name: "2180 Diamonds", amount: 2180, price: 290000, category: "diamonds" },
      { id: "ff-mp", name: "Member Mingguan", amount: 1, price: 28000, category: "pass" },
      { id: "ff-mb", name: "Member Bulanan", amount: 1, price: 120000, category: "pass" },
    ]
  },
  {
    id: 3,
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    developer: "Tencent",
    category: "mobile",
    popular: true,
    icon: "assets/images/Gamelogo/pubg.jpg",
    banner: "assets/images/Gamelogo/pubg.jpg",
    color: "#F5A623",
    fields: [
      { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID", type: "text" }
    ],
    helpText: "Buka game → Profil → Player ID terletak di bawah nama karakter.",
    items: [
      { id: "pubg-60", name: "60 UC", amount: 60, price: 15000, category: "uc" },
      { id: "pubg-325", name: "325 UC", amount: 325, price: 72000, category: "uc" },
      { id: "pubg-660", name: "660 UC", amount: 660, price: 140000, category: "uc" },
      { id: "pubg-1800", name: "1800 UC", amount: 1800, price: 370000, category: "uc" },
      { id: "pubg-3850", name: "3850 UC", amount: 3850, price: 740000, category: "uc" },
      { id: "pubg-8100", name: "8100 UC", amount: 8100, price: 1480000, category: "uc" },
      { id: "pubg-rp", name: "Royale Pass", amount: 1, price: 150000, category: "pass" },
    ]
  },
  {
    id: 4,
    name: "Valorant",
    slug: "valorant",
    developer: "Riot Games",
    category: "pc",
    popular: true,
    icon: "assets/images/Gamelogo/valorant.png",
    banner: "assets/images/Gamelogo/valorant.png",
    color: "#FD4556",
    fields: [
      { name: "userId", label: "Riot ID", placeholder: "Contoh: Player#1234", type: "text" }
    ],
    helpText: "Buka Valorant → Settings → Riot ID terletak di bagian Account.",
    items: [
      { id: "val-125", name: "125 VP", amount: 125, price: 15000, category: "vp" },
      { id: "val-420", name: "420 VP", amount: 420, price: 45000, category: "vp" },
      { id: "val-700", name: "700 VP", amount: 700, price: 72000, category: "vp" },
      { id: "val-1375", name: "1375 VP", amount: 1375, price: 140000, category: "vp" },
      { id: "val-2400", name: "2400 VP", amount: 2400, price: 240000, category: "vp" },
      { id: "val-4000", name: "4000 VP", amount: 4000, price: 390000, category: "vp" },
      { id: "val-8150", name: "8150 VP", amount: 8150, price: 780000, category: "vp" },
    ]
  },
  {
    id: 5,
    name: "Genshin Impact",
    slug: "genshin-impact",
    developer: "HoYoverse",
    category: "mobile",
    popular: true,
    icon: "assets/images/Gamelogo/ghensin.webp",
    banner: "assets/images/Gamelogo/ghensin.webp",
    color: "#5EBCB3",
    fields: [
      { name: "userId", label: "UID", placeholder: "Masukkan UID", type: "text" },
      { name: "serverId", label: "Server", placeholder: "Pilih Server", type: "select",
        options: ["Asia", "America", "Europe", "TW/HK/MO"] }
    ],
    helpText: "Buka game → Paimon Menu → UID terletak di pojok kanan bawah layar.",
    items: [
      { id: "gi-60", name: "60 Genesis Crystals", amount: 60, price: 16000, category: "crystals" },
      { id: "gi-300", name: "300+30 Genesis Crystals", amount: 330, price: 79000, category: "crystals" },
      { id: "gi-980", name: "980+110 Genesis Crystals", amount: 1090, price: 249000, category: "crystals" },
      { id: "gi-1980", name: "1980+260 Genesis Crystals", amount: 2240, price: 479000, category: "crystals" },
      { id: "gi-3280", name: "3280+600 Genesis Crystals", amount: 3880, price: 789000, category: "crystals" },
      { id: "gi-6480", name: "6480+1600 Genesis Crystals", amount: 8080, price: 1579000, category: "crystals" },
      { id: "gi-welkin", name: "Blessing of Welkin Moon", amount: 1, price: 79000, category: "pass" },
    ]
  },
  {
    id: 6,
    name: "Honkai: Star Rail",
    slug: "honkai-star-rail",
    developer: "HoYoverse",
    category: "mobile",
    popular: true,
    icon: "assets/images/Gamelogo/Honkai_Star_Rail.webp",
    banner: "assets/images/Gamelogo/Honkai_Star_Rail.webp",
    color: "#C4A3FF",
    fields: [
      { name: "userId", label: "UID", placeholder: "Masukkan UID", type: "text" },
      { name: "serverId", label: "Server", placeholder: "Pilih Server", type: "select",
        options: ["Asia", "America", "Europe", "TW/HK/MO"] }
    ],
    helpText: "Buka game → Phone → UID terletak di pojok kiri bawah layar.",
    items: [
      { id: "hsr-60", name: "60 Oneiric Shards", amount: 60, price: 16000, category: "shards" },
      { id: "hsr-300", name: "300+30 Oneiric Shards", amount: 330, price: 79000, category: "shards" },
      { id: "hsr-980", name: "980+110 Oneiric Shards", amount: 1090, price: 249000, category: "shards" },
      { id: "hsr-1980", name: "1980+260 Oneiric Shards", amount: 2240, price: 479000, category: "shards" },
      { id: "hsr-3280", name: "3280+600 Oneiric Shards", amount: 3880, price: 789000, category: "shards" },
      { id: "hsr-6480", name: "6480+1600 Oneiric Shards", amount: 8080, price: 1579000, category: "shards" },
      { id: "hsr-express", name: "Express Supply Pass", amount: 1, price: 79000, category: "pass" },
    ]
  },
  {
    id: 7,
    name: "Honor of Kings",
    slug: "honor-of-kings",
    developer: "TiMi Studio",
    category: "mobile",
    popular: false,
    icon: "assets/images/Gamelogo/honor of kings.webp",
    banner: "assets/images/Gamelogo/honor of kings.webp",
    color: "#FFD700",
    fields: [
      { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID", type: "text" }
    ],
    helpText: "Buka game → Profil → Player ID terletak di bawah avatar.",
    items: [
      { id: "hok-10", name: "10 Tokens", amount: 10, price: 3200, category: "tokens" },
      { id: "hok-50", name: "50 Tokens", amount: 50, price: 15500, category: "tokens" },
      { id: "hok-100", name: "100 Tokens", amount: 100, price: 31000, category: "tokens" },
      { id: "hok-250", name: "250 Tokens", amount: 250, price: 77500, category: "tokens" },
      { id: "hok-500", name: "500 Tokens", amount: 500, price: 155000, category: "tokens" },
      { id: "hok-wp", name: "Weekly Pass", amount: 1, price: 28000, category: "pass" },
    ]
  },
  {
    id: 8,
    name: "Call of Duty Mobile",
    slug: "call-of-duty-mobile",
    developer: "Activision",
    category: "mobile",
    popular: false,
    icon: "assets/images/Gamelogo/Call of duty mobile.jpg",
    banner: "assets/images/Gamelogo/Call of duty mobile.jpg",
    color: "#4CAF50",
    fields: [
      { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID", type: "text" }
    ],
    helpText: "Buka game → Profil → Player ID terletak di pojok atas.",
    items: [
      { id: "codm-80", name: "80 CP", amount: 80, price: 16000, category: "cp" },
      { id: "codm-240", name: "240 CP", amount: 240, price: 45000, category: "cp" },
      { id: "codm-400", name: "400 CP", amount: 400, price: 72000, category: "cp" },
      { id: "codm-800", name: "800 CP", amount: 800, price: 140000, category: "cp" },
      { id: "codm-2000", name: "2000 CP", amount: 2000, price: 345000, category: "cp" },
      { id: "codm-bp", name: "Battle Pass", amount: 1, price: 89000, category: "pass" },
    ]
  },
  {
    id: 9,
    name: "Roblox",
    slug: "roblox",
    developer: "Roblox Corp.",
    category: "pc",
    popular: false,
    icon: "assets/images/Gamelogo/Roblox_Logo.jpg",
    banner: "assets/images/Gamelogo/Roblox_Logo.jpg",
    color: "#E2231A",
    fields: [
      { name: "userId", label: "Username", placeholder: "Masukkan Username Roblox", type: "text" }
    ],
    helpText: "Masukkan username Roblox kamu (bukan display name).",
    items: [
      { id: "rbx-80", name: "80 Robux", amount: 80, price: 15000, category: "robux" },
      { id: "rbx-160", name: "160 Robux", amount: 160, price: 29000, category: "robux" },
      { id: "rbx-240", name: "240 Robux", amount: 240, price: 43000, category: "robux" },
      { id: "rbx-320", name: "320 Robux", amount: 320, price: 57000, category: "robux" },
      { id: "rbx-800", name: "800 Robux", amount: 800, price: 140000, category: "robux" },
      { id: "rbx-1700", name: "1700 Robux", amount: 1700, price: 285000, category: "robux" },
    ]
  },
  {
    id: 10,
    name: "Steam Wallet",
    slug: "steam-wallet",
    developer: "Valve",
    category: "voucher",
    popular: true,
    icon: "assets/images/Gamelogo/steam wallet.webp",
    banner: "assets/images/Gamelogo/steam wallet.webp",
    color: "#1B2838",
    fields: [],
    helpText: "Kode voucher akan dikirimkan via WhatsApp setelah pembayaran.",
    items: [
      { id: "stm-12", name: "Steam Wallet IDR 12.000", amount: 12000, price: 15000, category: "wallet" },
      { id: "stm-45", name: "Steam Wallet IDR 45.000", amount: 45000, price: 52000, category: "wallet" },
      { id: "stm-60", name: "Steam Wallet IDR 60.000", amount: 60000, price: 68000, category: "wallet" },
      { id: "stm-90", name: "Steam Wallet IDR 90.000", amount: 90000, price: 100000, category: "wallet" },
      { id: "stm-120", name: "Steam Wallet IDR 120.000", amount: 120000, price: 134000, category: "wallet" },
      { id: "stm-250", name: "Steam Wallet IDR 250.000", amount: 250000, price: 275000, category: "wallet" },
      { id: "stm-400", name: "Steam Wallet IDR 400.000", amount: 400000, price: 435000, category: "wallet" },
      { id: "stm-600", name: "Steam Wallet IDR 600.000", amount: 600000, price: 650000, category: "wallet" },
    ]
  },
  {
    id: 11,
    name: "Garena Shell",
    slug: "garena-shell",
    developer: "Garena",
    category: "voucher",
    popular: false,
    icon: "assets/images/Gamelogo/garena shell.png",
    banner: "assets/images/Gamelogo/garena shell.png",
    color: "#FF5722",
    fields: [],
    helpText: "Kode voucher akan dikirimkan via WhatsApp setelah pembayaran.",
    items: [
      { id: "gs-33", name: "33 Shells", amount: 33, price: 5200, category: "shells" },
      { id: "gs-66", name: "66 Shells", amount: 66, price: 10300, category: "shells" },
      { id: "gs-100", name: "100 Shells", amount: 100, price: 15500, category: "shells" },
      { id: "gs-200", name: "200 Shells", amount: 200, price: 31000, category: "shells" },
      { id: "gs-330", name: "330 Shells", amount: 330, price: 51000, category: "shells" },
      { id: "gs-500", name: "500 Shells", amount: 500, price: 77500, category: "shells" },
    ]
  },
  {
    id: 12,
    name: "Arena of Valor",
    slug: "arena-of-valor",
    developer: "TiMi Studio",
    category: "mobile",
    popular: false,
    icon: "assets/images/Gamelogo/arena-of-valor-aov.png",
    banner: "assets/images/Gamelogo/arena-of-valor-aov.png",
    color: "#2196F3",
    fields: [
      { name: "userId", label: "Player ID", placeholder: "Masukkan Player ID", type: "text" }
    ],
    helpText: "Buka game → Profil → Player ID terletak di pojok kiri atas.",
    items: [
      { id: "aov-50", name: "50 Vouchers", amount: 50, price: 8000, category: "vouchers" },
      { id: "aov-100", name: "100 Vouchers", amount: 100, price: 15500, category: "vouchers" },
      { id: "aov-200", name: "200 Vouchers", amount: 200, price: 31000, category: "vouchers" },
      { id: "aov-300", name: "300 Vouchers", amount: 300, price: 45000, category: "vouchers" },
      { id: "aov-500", name: "500 Vouchers", amount: 500, price: 77500, category: "vouchers" },
      { id: "aov-sp", name: "Starlight Pass", amount: 1, price: 28000, category: "pass" },
    ]
  }
];


// ─── Payment Methods ────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    group: "QRIS",
    icon: "qris",
    badge: "Best Price",
    methods: [
      { id: "qris", name: "QRIS (Semua Aplikasi)", fee: 0, icon: "qris" }
    ]
  },
  {
    group: "E-Wallet",
    icon: "ewallet",
    badge: null,
    methods: [
      { id: "dana", name: "DANA", fee: 1000, icon: "dana" },
      { id: "ovo", name: "OVO", fee: 1000, icon: "ovo" },
      { id: "gopay", name: "GoPay", fee: 1000, icon: "gopay" },
      { id: "shopeepay", name: "ShopeePay", fee: 1000, icon: "shopeepay" }
    ]
  },
  {
    group: "Virtual Account",
    icon: "bank",
    badge: null,
    methods: [
      { id: "va-bca", name: "Bank BCA", fee: 2500, icon: "bca" },
      { id: "va-bni", name: "Bank BNI", fee: 2500, icon: "bni" },
      { id: "va-bri", name: "Bank BRI", fee: 2500, icon: "bri" },
      { id: "va-mandiri", name: "Bank Mandiri", fee: 2500, icon: "mandiri" }
    ]
  },
  {
    group: "Minimarket",
    icon: "store",
    badge: null,
    methods: [
      { id: "alfamart", name: "Alfamart", fee: 2500, icon: "alfamart" },
      { id: "indomaret", name: "Indomaret", fee: 2500, icon: "indomaret" }
    ]
  }
];


// Dummy Transactions dihapus karena sudah menggunakan Supabase


// ─── Helper: Format Rupiah ──────────────────────────────────
function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

// ─── Helper: Get game by slug ───────────────────────────────
function getGameBySlug(slug) {
  return GAMES.find(g => g.slug === slug) || null;
}

// ─── Helper: Game SVG Icons (inline) ────────────────────────
// Now uses actual game logos!
function getGameIconSVG(game) {
  return `<img src="${game.icon}" alt="${game.name}" class="w-full h-full object-cover">`;
}

// ─── Helper: Payment Icon SVGs ──────────────────────────────
const PAYMENT_ICONS = {
  qris: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#E31E52"/><text x="20" y="25" text-anchor="middle" font-size="9" font-weight="700" fill="white" font-family="Inter">QRIS</text></svg>`,
  dana: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#108EE9"/><text x="20" y="26" text-anchor="middle" font-size="10" font-weight="700" fill="white" font-family="Inter">DANA</text></svg>`,
  ovo: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#4C2A86"/><text x="20" y="26" text-anchor="middle" font-size="10" font-weight="700" fill="white" font-family="Inter">OVO</text></svg>`,
  gopay: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#00AED6"/><text x="20" y="25" text-anchor="middle" font-size="8" font-weight="700" fill="white" font-family="Inter">GoPay</text></svg>`,
  shopeepay: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#EE4D2D"/><text x="20" y="25" text-anchor="middle" font-size="7" font-weight="700" fill="white" font-family="Inter">SPay</text></svg>`,
  bca: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#003D79"/><text x="20" y="26" text-anchor="middle" font-size="10" font-weight="700" fill="white" font-family="Inter">BCA</text></svg>`,
  bni: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#F15A22"/><text x="20" y="26" text-anchor="middle" font-size="10" font-weight="700" fill="white" font-family="Inter">BNI</text></svg>`,
  bri: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#003B71"/><text x="20" y="26" text-anchor="middle" font-size="10" font-weight="700" fill="white" font-family="Inter">BRI</text></svg>`,
  mandiri: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#003068"/><text x="20" y="24" text-anchor="middle" font-size="7" font-weight="700" fill="white" font-family="Inter">MDR</text></svg>`,
  alfamart: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#ED1C24"/><text x="20" y="25" text-anchor="middle" font-size="7" font-weight="700" fill="white" font-family="Inter">Alfa</text></svg>`,
  indomaret: `<svg viewBox="0 0 40 40" class="w-8 h-8"><rect width="40" height="40" rx="8" fill="#003D98"/><text x="20" y="25" text-anchor="middle" font-size="7" font-weight="700" fill="white" font-family="Inter">Indo</text></svg>`,
};
