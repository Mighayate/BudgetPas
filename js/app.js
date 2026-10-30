/**
 * ==============================================================================
 * BUDGETPAS - Smart Financial Management for Students
 * Multi-Page Pure Web Application (HTML5, CSS3, Vanilla JavaScript)
 * 
 * Pengelolaan Data:
 * - Data Dummy / Seed: data/sample-data.json (disinkronkan dengan DUMMY_DATA)
 * - Cache & Sinkronisasi Antar-Halaman: Browser LocalStorage (Kunci: 'budgetpas_data_v1')
 * - Tanpa dependensi Python atau SQLite.
 * 
 * Halaman-halaman Aplikasi (Multi-Page):
 * 1. index.html        -> Dashboard Keuangan
 * 2. budgets.html      -> Anggaran Bulanan
 * 3. transactions.html -> Catat Transaksi (Pemasukan & Pengeluaran)
 * 4. reports.html      -> Laporan Pengeluaran
 * 5. reminders.html    -> Pengingat Anggaran
 * 6. goals.html        -> Target Tabungan
 * 7. calendar.html     -> Kalender Keuangan
 * 8. settings.html     -> Pengaturan & Manajemen Data
 * ==============================================================================
 */

// Kunci penyimpanan LocalStorage browser
const STORAGE_KEY = 'budgetpas_data_v1';

// ==============================================================================
// 1. DATA DUMMY AWAL (SESUAI DENGAN data/sample-data.json)
// ==============================================================================
const DUMMY_DATA = {
  profile: {
    name: "Andi Pratama",
    role: "Mahasiswa Kos",
    campus: "Universitas Indonesia",
    monthlyAllowance: 1500000
  },
  budgets: [
    { id: 1, category: "Makan", amount: 450000, color: "#e45d65" },
    { id: 2, category: "Transportasi", amount: 300000, color: "#3498db" },
    { id: 3, category: "Kuliah", amount: 300000, color: "#8b5cf6" },
    { id: 4, category: "Hiburan", amount: 150000, color: "#ec4899" },
    { id: 5, category: "Tabungan", amount: 300000, color: "#0d9475" }
  ],
  transactions: [
    {
      id: 1,
      kind: "Pemasukan",
      category: "Uang Bulanan",
      amount: 1500000,
      note: "Uang bulanan dari orang tua",
      tx_date: "2026-10-01"
    },
    {
      id: 2,
      kind: "Pengeluaran",
      category: "Kuliah",
      amount: 95000,
      note: "Beli modul & buku ajar praktikum",
      tx_date: "2026-10-03"
    },
    {
      id: 3,
      kind: "Pengeluaran",
      category: "Makan",
      amount: 25000,
      note: "Makan siang nasi padang",
      tx_date: "2026-10-06"
    },
    {
      id: 4,
      kind: "Pengeluaran",
      category: "Transportasi",
      amount: 40000,
      note: "Bensin motor & parkir seminggu",
      tx_date: "2026-10-10"
    },
    {
      id: 5,
      kind: "Pemasukan",
      category: "Gaji / Freelance",
      amount: 350000,
      note: "Honor asisten lab / freelance tugas",
      tx_date: "2026-10-15"
    },
    {
      id: 6,
      kind: "Pengeluaran",
      category: "Makan",
      amount: 180000,
      note: "Belanja bahan makan & beras di warung",
      tx_date: "2026-10-18"
    },
    {
      id: 7,
      kind: "Pengeluaran",
      category: "Hiburan",
      amount: 110000,
      note: "Nonton bioskop & jajan sama teman",
      tx_date: "2026-10-21"
    },
    {
      id: 8,
      kind: "Pengeluaran",
      category: "Transportasi",
      amount: 45000,
      note: "Servis oli motor bulanan",
      tx_date: "2026-10-24"
    },
    {
      id: 9,
      kind: "Pengeluaran",
      category: "Hiburan",
      amount: 55000,
      note: "Langganan Spotify & ngopi di kafe",
      tx_date: "2026-10-28"
    },
    {
      id: 10,
      kind: "Pengeluaran",
      category: "Makan",
      amount: 175000,
      note: "Makan harian minggu akhir bulan",
      tx_date: "2026-10-29"
    },
    {
      id: 11,
      kind: "Pengeluaran",
      category: "Transportasi",
      amount: 25000,
      note: "Isi kartu commuter line & ojek",
      tx_date: "2026-10-30"
    },
    {
      id: 12,
      kind: "Pengeluaran",
      category: "Makan",
      amount: 15000,
      note: "Makan siang kantin hari ini",
      tx_date: "2026-10-30"
    },
    {
      id: 13,
      kind: "Pengeluaran",
      category: "Makan",
      amount: 420000,
      note: "Akumulasi makan bulan Agustus",
      tx_date: "2026-08-28"
    },
    {
      id: 14,
      kind: "Pengeluaran",
      category: "Makan",
      amount: 440000,
      note: "Akumulasi makan bulan September",
      tx_date: "2026-09-29"
    }
  ],
  goals: [
    {
      id: 1,
      title: "Dana Darurat Mahasiswa Kos",
      target: 1000000,
      saved: 350000,
      deadline: "2026-12-31"
    },
    {
      id: 2,
      title: "Beli Laptop / Modul Skripsi",
      target: 3000000,
      saved: 950000,
      deadline: "2027-06-30"
    },
    {
      id: 3,
      title: "Liburan Semester Bersama Teman",
      target: 500000,
      saved: 500000,
      deadline: "2026-11-30"
    }
  ]
};

// ==============================================================================
// 2. STORAGE MANAGER (LOCALSTORAGE & JSON CRUD)
// ==============================================================================
const StorageManager = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.save(DUMMY_DATA);
        return JSON.parse(JSON.stringify(DUMMY_DATA));
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Gagal membaca LocalStorage, memuat fallback Dummy Data:", e);
      return JSON.parse(JSON.stringify(DUMMY_DATA));
    }
  },

  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Gagal menyimpan ke LocalStorage:", e);
      return false;
    }
  },

  resetToDummy() {
    const clone = JSON.parse(JSON.stringify(DUMMY_DATA));
    this.save(clone);
    return clone;
  },

  reset() {
    return this.resetToDummy();
  },

  exportJSON() {
    const data = this.load();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budgetpas-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.budgets && parsed.transactions && parsed.goals) {
        this.save(parsed);
        return true;
      }
      throw new Error("Struktur JSON tidak valid.");
    } catch (e) {
      console.error("Gagal mengimpor file JSON:", e);
      return false;
    }
  }
};

// ==============================================================================
// 3. FORMATTERS & UI HELPERS
// ==============================================================================
const Formatters = {
  rupiah(num) {
    const val = Number(num) || 0;
    return "Rp " + Math.round(val).toLocaleString("id-ID");
  },

  parseNumber(str) {
    if (typeof str === 'number') return Math.round(str);
    if (!str) return 0;
    const clean = str.toString().replace(/[^\d]/g, '');
    return parseInt(clean, 10) || 0;
  },

  dateIndo(dateStr) {
    if (!dateStr) return "-";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  },

  categoryIcon(category) {
    const map = {
      'Makan': '🍜',
      'Transportasi': '🚌',
      'Kuliah': '🎓',
      'Hiburan': '🎧',
      'Tabungan': '🐷',
      'Uang Bulanan': '💵',
      'Gaji / Freelance': '💼',
      'Kos / Tempat Tinggal': '🏠',
      'Belanja': '🛍️',
      'Kesehatan': '💊',
      'Pulsa & Kuota': '📱',
      'Lainnya': '◉'
    };
    return map[category] || '◉';
  }
};

// ==============================================================================
// 4. FINANCE ENGINE
// ==============================================================================
const FinanceEngine = {
  calculate(data) {
    const transactions = data.transactions || [];
    const budgets = data.budgets || [];
    const goals = data.goals || [];

    let totalIncome = 0;
    let totalExpense = 0;
    const spentByCategory = {};

    transactions.forEach(t => {
      const amount = Number(t.amount) || 0;
      if (t.kind === 'Pemasukan') {
        totalIncome += amount;
      } else if (t.kind === 'Pengeluaran') {
        totalExpense += amount;
        spentByCategory[t.category] = (spentByCategory[t.category] || 0) + amount;
      }
    });

    const balance = totalIncome - totalExpense;

    const budgetStats = budgets.map(b => {
      const spent = spentByCategory[b.category] || 0;
      const amount = Number(b.amount) || 0;
      const pct = amount > 0 ? Math.round((spent / amount) * 100) : 0;
      const remaining = amount - spent;

      let statusKey = 'safe';
      let statusLabel = 'Aman';
      let statusColor = 'green';

      if (pct >= 100) {
        statusKey = 'danger';
        statusLabel = 'Melebihi anggaran';
        statusColor = 'red';
      } else if (pct >= 80) {
        statusKey = 'warning';
        statusLabel = 'Hampir habis';
        statusColor = 'yellow';
      }

      return {
        ...b,
        spent,
        pct,
        remaining,
        statusKey,
        statusLabel,
        statusColor
      };
    });

    const alertBudgets = budgetStats.filter(b => b.pct >= 80);

    let totalGoalTarget = 0;
    let totalGoalSaved = 0;
    const goalStats = goals.map(g => {
      const target = Number(g.target) || 0;
      const saved = Number(g.saved) || 0;
      const pct = target > 0 ? Math.min(100, Math.round((saved / target) * 100)) : 0;
      const remaining = Math.max(0, target - saved);

      totalGoalTarget += target;
      totalGoalSaved += saved;

      return {
        ...g,
        target,
        saved,
        pct,
        remaining
      };
    });

    return {
      totalIncome,
      totalExpense,
      balance,
      spentByCategory,
      budgetStats,
      alertBudgets,
      goalStats,
      totalGoalTarget,
      totalGoalSaved
    };
  }
};

// ==============================================================================
// 5. CHART MANAGER
// ==============================================================================
const ChartManager = {
  charts: {},

  destroyChart(id) {
    if (this.charts[id]) {
      this.charts[id].destroy();
      delete this.charts[id];
    }
  },

  renderDashboardDoughnut(canvasId, budgetStats, totalExpense) {
    this.destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    const activeBudgets = budgetStats.filter(b => b.spent > 0);
    if (activeBudgets.length === 0 || totalExpense <= 0) return;

    const labels = activeBudgets.map(b => b.category);
    const values = activeBudgets.map(b => b.spent);
    const colors = activeBudgets.map(b => b.color || '#128568');

    const ctx = canvas.getContext('2d');
    this.charts[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 0,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                const label = ctx.label || '';
                const val = ctx.raw || 0;
                const pct = Math.round((val / totalExpense) * 100);
                return ` ${label}: ${Formatters.rupiah(val)} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  },

  renderCategoryBarChart(canvasId, categoryRows) {
    this.destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    if (!categoryRows || categoryRows.length === 0) return;

    const labels = categoryRows.map(r => r.category);
    const values = categoryRows.map(r => r.amount);

    const ctx = canvas.getContext('2d');
    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pengeluaran (Rp)',
          data: values,
          backgroundColor: '#128568',
          borderRadius: 8,
          maxBarThickness: 42
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${Formatters.rupiah(ctx.raw)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#edf2ef' },
            ticks: {
              callback: v => Formatters.rupiah(v)
            }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  },

  renderMonthlyLineChart(canvasId, monthlyRows) {
    this.destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return;

    if (!monthlyRows || monthlyRows.length === 0) return;

    const labels = monthlyRows.map(m => m.monthLabel);
    const values = monthlyRows.map(m => m.amount);

    const ctx = canvas.getContext('2d');
    this.charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Pengeluaran',
          data: values,
          borderColor: '#128568',
          backgroundColor: 'rgba(18, 133, 104, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: '#128568',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Pengeluaran: ${Formatters.rupiah(ctx.raw)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#edf2ef' },
            ticks: {
              callback: v => Formatters.rupiah(v)
            }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
};

// ==============================================================================
// 6. CALENDAR MANAGER
// ==============================================================================
const CalendarManager = {
  viewYear: 2026,
  viewMonth: 9, // Oktober (0-indexed)
  selectedDate: "2026-10-30",

  init() {
    const now = new Date();
    this.viewYear = now.getFullYear() >= 2026 ? now.getFullYear() : 2026;
    this.viewMonth = now.getMonth();
    this.selectedDate = `${this.viewYear}-${String(this.viewMonth + 1).padStart(2, '0')}-30`;
  },

  prevMonth() {
    this.viewMonth--;
    if (this.viewMonth < 0) {
      this.viewMonth = 11;
      this.viewYear--;
    }
    this.render();
  },

  nextMonth() {
    this.viewMonth++;
    if (this.viewMonth > 11) {
      this.viewMonth = 0;
      this.viewYear++;
    }
    this.render();
  },

  today() {
    const now = new Date();
    this.viewYear = now.getFullYear();
    this.viewMonth = now.getMonth();
    this.selectedDate = now.toISOString().slice(0, 10);
    this.render();
    UIManager.renderCalendarDetail();
  },

  selectDate(dateStr) {
    this.selectedDate = dateStr;
    this.render();
    UIManager.renderCalendarDetail();
  },

  render() {
    const grid = document.getElementById('calendarGrid');
    const title = document.getElementById('calendarMonthTitle');
    if (!grid || !title) return;

    const viewDateObj = new Date(this.viewYear, this.viewMonth, 1);
    title.textContent = new Intl.DateTimeFormat('id-ID', {
      month: 'long',
      year: 'numeric'
    }).format(viewDateObj);

    grid.innerHTML = '';

    const daysName = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    daysName.forEach(name => {
      const el = document.createElement('div');
      el.className = 'weekday';
      el.textContent = name;
      grid.appendChild(el);
    });

    const firstDay = (new Date(this.viewYear, this.viewMonth, 1).getDay() + 6) % 7;
    const totalDays = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const todayStr = new Date().toISOString().slice(0, 10);

    const data = StorageManager.load();
    const transactions = data.transactions || [];

    const txByDate = {};
    transactions.forEach(t => {
      if (!txByDate[t.tx_date]) {
        txByDate[t.tx_date] = [];
      }
      txByDate[t.tx_date].push(t);
    });

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'day blank';
      grid.appendChild(blank);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dStr = String(d).padStart(2, '0');
      const mStr = String(this.viewMonth + 1).padStart(2, '0');
      const dateKey = `${this.viewYear}-${mStr}-${dStr}`;

      const cell = document.createElement('div');
      cell.className = 'day';

      if (dateKey === todayStr) {
        cell.classList.add('today');
      }

      if (dateKey === this.selectedDate) {
        cell.classList.add('selected');
      }

      const numSpan = document.createElement('span');
      numSpan.textContent = d;
      cell.appendChild(numSpan);

      const dayTx = txByDate[dateKey] || [];
      if (dayTx.length > 0) {
        const dotsWrap = document.createElement('div');
        dotsWrap.className = 'day-dots';

        const hasIncome = dayTx.some(t => t.kind === 'Pemasukan');
        const hasExpense = dayTx.some(t => t.kind === 'Pengeluaran');

        if (hasIncome) {
          const greenDot = document.createElement('i');
          greenDot.className = 'dot green-dot';
          greenDot.title = 'Pemasukan';
          dotsWrap.appendChild(greenDot);
        }
        if (hasExpense) {
          const redDot = document.createElement('i');
          redDot.className = 'dot red-dot';
          redDot.title = 'Pengeluaran';
          dotsWrap.appendChild(redDot);
        }

        cell.appendChild(dotsWrap);
      }

      cell.addEventListener('click', () => {
        this.selectDate(dateKey);
      });

      grid.appendChild(cell);
    }
  }
};

// ==============================================================================
// 7. UI MANAGER (MULTI-PAGE & INTERAKSI)
// ==============================================================================
const UIManager = {
  activeView: 'dashboard',

  // Deteksi halaman aktif dari data-page body atau nama file URL
  detectCurrentPage() {
    const bodyPage = document.body.getAttribute('data-page');
    if (bodyPage) return bodyPage;

    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('budgets.html')) return 'budgets';
    if (path.endsWith('transactions.html')) return 'transactions';
    if (path.endsWith('reports.html')) return 'reports';
    if (path.endsWith('reminders.html')) return 'reminders';
    if (path.endsWith('goals.html')) return 'goals';
    if (path.endsWith('calendar.html')) return 'calendar';
    if (path.endsWith('settings.html')) return 'settings';

    // Fallback hash jika dijalankan sebagai SPA
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash;

    return 'dashboard';
  },

  // Helper set textContent dengan aman tanpa throw error jika elemen tidak ada di halaman ini
  setTxt(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  init() {
    // 1. Tentukan halaman yang sedang dibuka
    this.activeView = this.detectCurrentPage();

    // 2. Berikan class 'active' pada link sidebar yang sesuai
    document.querySelectorAll('.sidebar nav a').forEach(a => {
      const target = a.getAttribute('data-view');
      if (target === this.activeView) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });

    // 3. Setup Mobile Drawer Sidebar
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (menuToggle && sidebar && backdrop) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('open');
      });

      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
      });
    }

    // 4. Format otomatis input mata uang saat diketik
    this.bindCurrencyInputs();

    // 5. Ikat event form dan pencarian
    this.bindForms();

    // 6. Inisialisasi Kalender
    CalendarManager.init();

    // 7. Jika di halaman transaksi, tangani URL query parameter ?date=YYYY-MM-DD
    const txDateInput = document.getElementById('txDateInput');
    if (txDateInput) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('date')) {
        txDateInput.value = urlParams.get('date');
      } else if (!txDateInput.value) {
        txDateInput.value = new Date().toISOString().slice(0, 10);
      }
    }

    // 8. Render data pada halaman yang aktif
    this.renderAll();
  },

  // Navigasi multi-page (berpindah ke file .html yang sesuai)
  navigateTo(viewName) {
    const validViews = ['dashboard', 'budgets', 'transactions', 'reports', 'reminders', 'goals', 'calendar', 'settings'];
    if (!validViews.includes(viewName)) {
      viewName = 'dashboard';
    }

    if (viewName === 'dashboard') {
      window.location.href = 'index.html';
    } else {
      window.location.href = `${viewName}.html`;
    }
  },

  renderCurrentView() {
    const data = StorageManager.load();
    const stats = FinanceEngine.calculate(data);

    switch (this.activeView) {
      case 'dashboard':
        this.renderDashboard(data, stats);
        break;
      case 'budgets':
        this.renderBudgets(data, stats);
        break;
      case 'transactions':
        this.renderTransactions(data);
        break;
      case 'reports':
        this.renderReports(data, stats);
        break;
      case 'reminders':
        this.renderReminders(data, stats);
        break;
      case 'goals':
        this.renderGoals(data, stats);
        break;
      case 'calendar':
        CalendarManager.render();
        this.renderCalendarDetail();
        break;
      case 'settings':
        this.renderSettings(data);
        break;
    }
  },

  renderAll() {
    this.renderProfile();
    this.renderCurrentView();
  },

  renderProfile() {
    const data = StorageManager.load();
    const profile = data.profile || DUMMY_DATA.profile;

    this.setTxt('sidebarStudentName', profile.name);
    this.setTxt('topbarStudentName', profile.name);
    const welcomeName = document.getElementById('welcomeName');
    if (welcomeName) {
      welcomeName.textContent = profile.name.split(' ')[0] || profile.name;
    }
  },

  // 1. DASHBOARD
  renderDashboard(data, stats) {
    this.setTxt('dashIncome', Formatters.rupiah(stats.totalIncome));
    this.setTxt('dashExpense', Formatters.rupiah(stats.totalExpense));
    this.setTxt('dashBalance', Formatters.rupiah(stats.balance));
    this.setTxt('dashGoalsCount', `${(data.goals || []).length} target`);
    this.setTxt('dashExpenseCenterTotal', Formatters.rupiah(stats.totalExpense));

    ChartManager.renderDashboardDoughnut('dashExpenseChart', stats.budgetStats, stats.totalExpense);

    const legendWrap = document.getElementById('dashExpenseLegend');
    if (legendWrap) {
      legendWrap.innerHTML = '';
      const activeBudgets = stats.budgetStats.filter(b => b.spent > 0);
      if (activeBudgets.length === 0) {
        legendWrap.innerHTML = '<div class="empty-state" style="grid-column: 1/-1; padding: 14px 0;">Belum ada data pengeluaran.</div>';
      } else {
        activeBudgets.forEach(b => {
          const pctOfTotal = stats.totalExpense > 0 ? Math.round((b.spent / stats.totalExpense) * 100) : 0;
          const item = document.createElement('div');
          item.className = 'legend-item';
          item.innerHTML = `
            <i style="background: ${b.color || '#128568'}"></i>
            <span>${b.category}</span>
            <b>${pctOfTotal}%</b>
          `;
          legendWrap.appendChild(item);
        });
      }
    }

    const budgetListWrap = document.getElementById('dashBudgetList');
    if (budgetListWrap) {
      budgetListWrap.innerHTML = '';
      const topBudgets = stats.budgetStats.slice(0, 5);

      if (topBudgets.length === 0) {
        budgetListWrap.innerHTML = '<div class="empty-state">Belum ada kategori anggaran.</div>';
      } else {
        topBudgets.forEach(b => {
          const row = document.createElement('div');
          row.className = 'budget-row';
          const icon = Formatters.categoryIcon(b.category);
          const barWidth = Math.min(b.pct, 100);
          const barColor = b.pct >= 100 ? '#dc5964' : (b.pct >= 80 ? '#f0a52b' : (b.color || '#128568'));

          row.innerHTML = `
            <div class="category-icon" style="background: ${b.color}1a; color: ${b.color};">
              ${icon}
            </div>
            <div class="budget-info">
              <div class="budget-label">
                <b>${b.category}</b>
                <span>${Formatters.rupiah(b.spent)} <small>/ ${Formatters.rupiah(b.amount)}</small></span>
              </div>
              <div class="progress">
                <span style="width: ${barWidth}%; background-color: ${barColor};"></span>
              </div>
            </div>
            <strong class="percent">${b.pct}%</strong>
          `;
          budgetListWrap.appendChild(row);
        });
      }
    }

    const recentTxWrap = document.getElementById('dashRecentTxList');
    if (recentTxWrap) {
      recentTxWrap.innerHTML = '';
      const sorted = [...(data.transactions || [])].sort((a, b) => new Date(b.tx_date) - new Date(a.tx_date) || b.id - a.id);
      const recent = sorted.slice(0, 6);

      if (recent.length === 0) {
        recentTxWrap.innerHTML = '<div class="empty-state">Belum ada transaksi.</div>';
      } else {
        recent.forEach(t => {
          const row = document.createElement('div');
          row.className = 'transaction-row';
          const isIncome = t.kind === 'Pemasukan';
          const symbolClass = isIncome ? 'income' : 'expense';
          const symbolArrow = isIncome ? '↗' : '↘';
          const prefix = isIncome ? '+' : '−';
          const amountClass = isIncome ? 'positive' : '';

          row.innerHTML = `
            <div class="tx-symbol ${symbolClass}">${symbolArrow}</div>
            <div class="tx-desc">
              <b>${t.note || t.category}</b>
              <small>${t.category} · ${Formatters.dateIndo(t.tx_date)}</small>
            </div>
            <b class="tx-amount ${amountClass}">${prefix}${Formatters.rupiah(t.amount)}</b>
          `;
          recentTxWrap.appendChild(row);
        });
      }
    }
  },

  // 2. ANGGARAN BULANAN
  renderBudgets(data, stats) {
    const totalBudget = (data.budgets || []).reduce((acc, b) => acc + (Number(b.amount) || 0), 0);
    const totalSpent = stats.totalExpense;
    const remainingBudget = totalBudget - totalSpent;

    this.setTxt('budgetTotalAmount', Formatters.rupiah(totalBudget));
    this.setTxt('budgetTotalSpent', Formatters.rupiah(totalSpent));
    this.setTxt('budgetTotalRemaining', Formatters.rupiah(remainingBudget));

    const listWrap = document.getElementById('budgetRowsContainer');
    if (listWrap) {
      listWrap.innerHTML = '';
      if (stats.budgetStats.length === 0) {
        listWrap.innerHTML = '<div class="empty-state">Belum ada kategori anggaran.</div>';
      } else {
        stats.budgetStats.forEach(b => {
          const row = document.createElement('div');
          row.className = 'budget-row';
          const icon = Formatters.categoryIcon(b.category);
          const barWidth = Math.min(b.pct, 100);
          const barColor = b.pct >= 100 ? '#dc5964' : (b.pct >= 80 ? '#f0a52b' : (b.color || '#128568'));

          row.innerHTML = `
            <div class="category-icon" style="background: ${b.color}1a; color: ${b.color};">
              ${icon}
            </div>
            <div class="budget-info">
              <div class="budget-label">
                <b>${b.category}</b>
                <span>${Formatters.rupiah(b.spent)} <small>/ ${Formatters.rupiah(b.amount)}</small></span>
              </div>
              <div class="progress">
                <span style="width: ${barWidth}%; background-color: ${barColor};"></span>
              </div>
              <small style="color: var(--text-muted); font-size: 11px; margin-top: 4px; display: block;">
                Sisa: ${Formatters.rupiah(b.remaining)} · Status: <span class="status-tag ${b.statusColor}" style="padding: 2px 7px; font-size: 9px;">${b.statusLabel}</span>
              </small>
            </div>
            <strong class="percent">${b.pct}%</strong>
            <button class="icon-btn danger" title="Hapus kategori" onclick="UIManager.deleteBudgetConfirm(${b.id})">×</button>
          `;
          listWrap.appendChild(row);
        });
      }
    }

    this.updateCategoryDropdowns();
  },

  // 3. CATAT TRANSAKSI
  renderTransactions(data) {
    const listWrap = document.getElementById('txTableBody');
    const countPill = document.getElementById('txCountPill');
    const searchInput = document.getElementById('txSearchInput');
    const filterSelect = document.getElementById('txFilterKind');

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const kindFilter = filterSelect ? filterSelect.value : 'all';

    let transactions = [...(data.transactions || [])].sort((a, b) => new Date(b.tx_date) - new Date(a.tx_date) || b.id - a.id);

    if (query) {
      transactions = transactions.filter(t => 
        (t.note && t.note.toLowerCase().includes(query)) ||
        (t.category && t.category.toLowerCase().includes(query))
      );
    }

    if (kindFilter !== 'all') {
      transactions = transactions.filter(t => t.kind === kindFilter);
    }

    if (countPill) {
      countPill.textContent = `${transactions.length} transaksi`;
    }

    if (listWrap) {
      listWrap.innerHTML = '';
      if (transactions.length === 0) {
        listWrap.innerHTML = '<tr><td colspan="5" class="empty-state">Tidak ada transaksi yang cocok.</td></tr>';
      } else {
        transactions.forEach(t => {
          const tr = document.createElement('tr');
          const isIncome = t.kind === 'Pemasukan';
          const prefix = isIncome ? '+' : '−';
          const amountClass = isIncome ? 'positive' : 'negative';

          tr.innerHTML = `
            <td>
              <div class="table-title">${t.note || t.category}</div>
              <small>${Formatters.categoryIcon(t.category)} ${t.category}</small>
            </td>
            <td>
              <span class="category-badge" style="background: ${isIncome ? '#e8f5ef' : '#fff0f0'}; color: ${isIncome ? '#128568' : '#dc5964'};">
                ${t.kind}
              </span>
            </td>
            <td>${Formatters.dateIndo(t.tx_date)}</td>
            <td class="${amountClass}" style="font-weight: 700;">
              ${prefix}${Formatters.rupiah(t.amount)}
            </td>
            <td style="text-align: right;">
              <button class="icon-btn danger" title="Hapus transaksi" onclick="UIManager.deleteTransactionConfirm(${t.id})">×</button>
            </td>
          `;
          listWrap.appendChild(tr);
        });
      }
    }
  },

  // 4. LAPORAN PENGELUARAN
  renderReports(data, stats) {
    this.setTxt('reportTotalIncome', Formatters.rupiah(stats.totalIncome));
    this.setTxt('reportTotalExpense', Formatters.rupiah(stats.totalExpense));
    this.setTxt('reportTotalBalance', Formatters.rupiah(stats.balance));

    const categoryRows = Object.keys(stats.spentByCategory)
      .map(cat => ({ category: cat, amount: stats.spentByCategory[cat] }))
      .sort((a, b) => b.amount - a.amount);

    const reportListWrap = document.getElementById('reportCategoryList');
    if (reportListWrap) {
      reportListWrap.innerHTML = '';
      if (categoryRows.length === 0) {
        reportListWrap.innerHTML = '<div class="empty-state">Belum ada data pengeluaran.</div>';
      } else {
        categoryRows.forEach(c => {
          const pct = stats.totalExpense > 0 ? Math.round((c.amount / stats.totalExpense) * 100) : 0;
          const row = document.createElement('div');
          row.className = 'report-row';
          row.innerHTML = `
            <div>
              <b>${Formatters.categoryIcon(c.category)} ${c.category}</b>
              <small>${pct}% dari total pengeluaran</small>
            </div>
            <strong>${Formatters.rupiah(c.amount)}</strong>
          `;
          reportListWrap.appendChild(row);
        });
      }
    }

    ChartManager.renderCategoryBarChart('reportCategoryChart', categoryRows);

    const monthlyMap = {};
    (data.transactions || []).forEach(t => {
      if (t.kind === 'Pengeluaran' && t.tx_date) {
        const ym = t.tx_date.slice(0, 7);
        monthlyMap[ym] = (monthlyMap[ym] || 0) + (Number(t.amount) || 0);
      }
    });

    const sortedMonths = Object.keys(monthlyMap).sort();
    const monthlyRows = sortedMonths.map(ym => {
      const parts = ym.split('-');
      const d = new Date(parts[0], parts[1] - 1, 1);
      const label = new Intl.DateTimeFormat('id-ID', { month: 'short', year: 'numeric' }).format(d);
      return {
        monthKey: ym,
        monthLabel: label,
        amount: monthlyMap[ym]
      };
    });

    ChartManager.renderMonthlyLineChart('reportMonthlyChart', monthlyRows);

    const topCatEl = document.getElementById('reportTopCategoryEval');
    if (topCatEl) {
      if (categoryRows.length > 0) {
        const top = categoryRows[0];
        const topPct = stats.totalExpense > 0 ? Math.round((top.amount / stats.totalExpense) * 100) : 0;
        topCatEl.innerHTML = `
          <b>💡 Analisis Keuangan:</b> Kategori pengeluaran terbesarmu adalah <b>${top.category}</b> (${Formatters.rupiah(top.amount)} atau ${topPct}% dari seluruh pengeluaran). Evaluasi kebutuhan pada kategori ini untuk penghematan lebih lanjut.
        `;
      } else {
        topCatEl.innerHTML = '<b>💡 Analisis Keuangan:</b> Belum ada data pengeluaran yang dapat dianalisis.';
      }
    }
  },

  // 5. PENGINGAT ANGGARAN
  renderReminders(data, stats) {
    const bannerWrap = document.getElementById('remindersBannerWrap');
    const dangerCount = stats.budgetStats.filter(b => b.pct >= 100).length;
    const warningCount = stats.budgetStats.filter(b => b.pct >= 80 && b.pct < 100).length;

    if (bannerWrap) {
      if (dangerCount > 0) {
        bannerWrap.innerHTML = `
          <div class="alert-banner">
            <div class="alert-symbol">!</div>
            <div>
              <b>Perhatian! Anggaran Melebihi Batas</b>
              <p>Ada ${dangerCount} kategori yang telah melebihi batas 100% dan ${warningCount} kategori hampir habis (≥80%). Segera batasi pengeluaran pada pos terkait.</p>
            </div>
          </div>
        `;
      } else if (warningCount > 0) {
        bannerWrap.innerHTML = `
          <div class="alert-banner warning">
            <div class="alert-symbol">⚠</div>
            <div>
              <b>Peringatan! Anggaran Mulai Menipis</b>
              <p>Ada ${warningCount} kategori yang telah mencapai 80% atau lebih dari anggarannya. Waspadai pengeluaran sebelum akhir bulan.</p>
            </div>
          </div>
        `;
      } else {
        bannerWrap.innerHTML = `
          <div class="success-banner">
            <div class="alert-symbol">✓</div>
            <div>
              <b>Kondisi Anggaran Aman!</b>
              <p>Hebat! Belum ada kategori yang mencapai batas peringatan 80%. Pertahankan kebiasaan bijak mengatur keuanganmu.</p>
            </div>
          </div>
        `;
      }
    }

    const listWrap = document.getElementById('reminderRowsContainer');
    if (listWrap) {
      listWrap.innerHTML = '';
      if (stats.budgetStats.length === 0) {
        listWrap.innerHTML = '<div class="empty-state">Belum ada kategori anggaran.</div>';
      } else {
        stats.budgetStats.forEach(b => {
          const row = document.createElement('div');
          row.className = 'reminder-row';
          const icon = Formatters.categoryIcon(b.category);
          const barWidth = Math.min(b.pct, 100);
          const barColor = b.pct >= 100 ? '#dc5964' : (b.pct >= 80 ? '#f0a52b' : (b.color || '#128568'));

          row.innerHTML = `
            <div class="category-icon" style="background: ${b.color}1a; color: ${b.color};">
              ${icon}
            </div>
            <div class="reminder-main">
              <div class="budget-label">
                <b>${b.category}</b>
                <span>${b.pct}% terpakai</span>
              </div>
              <div class="progress">
                <span style="width: ${barWidth}%; background-color: ${barColor};"></span>
              </div>
              <small>${Formatters.rupiah(b.spent)} digunakan dari anggaran ${Formatters.rupiah(b.amount)} (Sisa: ${Formatters.rupiah(b.remaining)})</small>
            </div>
            <div class="status-tag ${b.statusColor}">
              ${b.statusLabel}
            </div>
          `;
          listWrap.appendChild(row);
        });
      }
    }
  },

  // 6. TARGET TABUNGAN
  renderGoals(data, stats) {
    this.setTxt('goalTotalSavedBanner', Formatters.rupiah(stats.totalGoalSaved));
    this.setTxt('goalTotalTargetBanner', Formatters.rupiah(stats.totalGoalTarget));
    this.setTxt('goalCountPill', `${(data.goals || []).length} target`);

    const listWrap = document.getElementById('goalCardsContainer');
    if (listWrap) {
      listWrap.innerHTML = '';
      if (stats.goalStats.length === 0) {
        listWrap.innerHTML = '<div class="empty-state">Belum ada target tabungan. Tambahkan target barumu sekarang!</div>';
      } else {
        stats.goalStats.forEach(g => {
          const card = document.createElement('div');
          card.className = 'goal-card';
          const isComplete = g.pct >= 100;

          card.innerHTML = `
            <div class="goal-top">
              <div class="goal-icon">${isComplete ? '🎉' : '◎'}</div>
              <div class="goal-title">
                <b>${g.title}</b>
                <small>${g.deadline ? 'Target: ' + Formatters.dateIndo(g.deadline) : 'Langkah konsisten menuju impianmu'}</small>
              </div>
              <span class="goal-percent">${g.pct}%</span>
              <button class="icon-btn danger" style="margin-left: 6px;" title="Hapus target" onclick="UIManager.deleteGoalConfirm(${g.id})">×</button>
            </div>
            <div class="goal-amounts">
              <b>${Formatters.rupiah(g.saved)}</b>
              <span>/ ${Formatters.rupiah(g.target)}</span>
              ${isComplete ? '<span style="color: #128568; font-weight: 700; margin-left: 8px;">(Tercapai!)</span>' : `<small style="display: block; color: var(--text-muted); margin-top: 2px;">Sisa yang dibutuhkan: ${Formatters.rupiah(g.remaining)}</small>`}
            </div>
            <div class="progress">
              <span style="width: ${g.pct}%; background-color: ${isComplete ? '#128568' : '#357fd6'};"></span>
            </div>
            ${!isComplete ? `
              <form class="save-inline" onsubmit="UIManager.handleSaveToGoal(event, ${g.id})">
                <div class="input-prefix">
                  <span>Rp</span>
                  <input type="text" inputmode="numeric" placeholder="Nominal tabungan" required>
                </div>
                <button type="submit" class="btn small primary">＋ Tambah Tabungan</button>
              </form>
            ` : ''}
          `;
          listWrap.appendChild(card);
        });
      }
    }
  },

  // 7. DETAIL TRANSAKSI KALENDER
  renderCalendarDetail() {
    const detailWrap = document.getElementById('calendarSelectedDateList');
    const selectedTitle = document.getElementById('calendarSelectedDateTitle');
    const totalDayEl = document.getElementById('calendarSelectedDateTotal');

    const selectedDate = CalendarManager.selectedDate || new Date().toISOString().slice(0, 10);
    if (selectedTitle) {
      selectedTitle.textContent = `Aktivitas Tanggal: ${Formatters.dateIndo(selectedDate)}`;
    }

    const data = StorageManager.load();
    const transactions = (data.transactions || []).filter(t => t.tx_date === selectedDate);

    let dayIncome = 0;
    let dayExpense = 0;
    transactions.forEach(t => {
      if (t.kind === 'Pemasukan') dayIncome += Number(t.amount) || 0;
      if (t.kind === 'Pengeluaran') dayExpense += Number(t.amount) || 0;
    });

    if (totalDayEl) {
      totalDayEl.innerHTML = `
        <span style="color: #128568;">Masuk: +${Formatters.rupiah(dayIncome)}</span> · 
        <span style="color: #dc5964;">Keluar: −${Formatters.rupiah(dayExpense)}</span>
      `;
    }

    if (detailWrap) {
      detailWrap.innerHTML = '';
      if (transactions.length === 0) {
        detailWrap.innerHTML = `
          <div class="empty-state" style="padding: 20px;">
            Tidak ada transaksi pada tanggal ini.
            <div style="margin-top: 10px;">
              <button class="btn small secondary" onclick="UIManager.quickAddOnDate('${selectedDate}')">＋ Catat di tanggal ini</button>
            </div>
          </div>
        `;
      } else {
        transactions.forEach(t => {
          const row = document.createElement('div');
          row.className = 'transaction-row';
          const isIncome = t.kind === 'Pemasukan';
          const prefix = isIncome ? '+' : '−';

          row.innerHTML = `
            <div class="tx-symbol ${isIncome ? 'income' : 'expense'}">${isIncome ? '↗' : '↘'}</div>
            <div class="tx-desc">
              <b>${t.note || t.category}</b>
              <small>${Formatters.categoryIcon(t.category)} ${t.category} · ${t.kind}</small>
            </div>
            <b class="tx-amount ${isIncome ? 'positive' : ''}">${prefix}${Formatters.rupiah(t.amount)}</b>
          `;
          detailWrap.appendChild(row);
        });
      }
    }
  },

  quickAddOnDate(dateStr) {
    window.location.href = `transactions.html?date=${encodeURIComponent(dateStr)}`;
  },

  // 8. PENGATURAN
  renderSettings(data) {
    const profile = data.profile || DUMMY_DATA.profile;
    const nameInput = document.getElementById('settingProfileName');
    const roleInput = document.getElementById('settingProfileRole');
    const allowanceInput = document.getElementById('settingMonthlyAllowance');

    if (nameInput) nameInput.value = profile.name || '';
    if (roleInput) roleInput.value = profile.role || '';
    if (allowanceInput) allowanceInput.value = (profile.monthlyAllowance || 1500000).toLocaleString('id-ID');
  },

  updateCategoryDropdowns() {
    const select = document.getElementById('txCategorySelect');
    if (!select) return;

    const currentVal = select.value;
    const data = StorageManager.load();
    const budgets = data.budgets || [];

    const defaultCats = [
      'Makan', 'Transportasi', 'Kuliah', 'Hiburan', 'Tabungan',
      'Uang Bulanan', 'Gaji / Freelance', 'Kos / Tempat Tinggal', 'Belanja', 'Lainnya'
    ];

    const allCategories = new Set(defaultCats);
    budgets.forEach(b => {
      if (b.category) allCategories.add(b.category);
    });

    select.innerHTML = '';
    allCategories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = `${Formatters.categoryIcon(cat)} ${cat}`;
      select.appendChild(opt);
    });

    if (currentVal && allCategories.has(currentVal)) {
      select.value = currentVal;
    }
  },

  bindForms() {
    // Form Tambah Transaksi
    const txForm = document.getElementById('addTransactionForm');
    if (txForm) {
      txForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const kind = txForm.querySelector('input[name="kind"]:checked')?.value || 'Pengeluaran';
        const date = txForm.querySelector('input[name="tx_date"]')?.value || new Date().toISOString().slice(0, 10);
        const category = txForm.querySelector('select[name="category"]')?.value || 'Lainnya';
        const rawAmount = txForm.querySelector('input[name="amount"]')?.value || '0';
        const note = txForm.querySelector('input[name="note"]')?.value.trim() || '';

        const amount = Formatters.parseNumber(rawAmount);
        if (amount <= 0) {
          this.showToast('Nominal harus lebih dari 0.', 'error');
          return;
        }

        const data = StorageManager.load();
        const newId = (data.transactions.length > 0 ? Math.max(...data.transactions.map(t => t.id)) : 0) + 1;

        data.transactions.unshift({
          id: newId,
          kind,
          category,
          amount,
          note,
          tx_date: date
        });

        StorageManager.save(data);
        this.showToast('Transaksi berhasil disimpan.', 'success');

        txForm.querySelector('input[name="amount"]').value = '';
        txForm.querySelector('input[name="note"]').value = '';

        this.renderAll();
      });
    }

    // Form Tambah Anggaran
    const budgetForm = document.getElementById('addBudgetForm');
    if (budgetForm) {
      budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const category = budgetForm.querySelector('input[name="category"]')?.value.trim();
        const rawAmount = budgetForm.querySelector('input[name="amount"]')?.value || '0';
        const color = budgetForm.querySelector('input[name="color"]')?.value || '#128568';

        const amount = Formatters.parseNumber(rawAmount);
        if (!category || amount <= 0) {
          this.showToast('Lengkapi nama kategori dan nominal anggaran.', 'error');
          return;
        }

        const data = StorageManager.load();
        const existingIdx = data.budgets.findIndex(b => b.category.toLowerCase() === category.toLowerCase());

        if (existingIdx >= 0) {
          data.budgets[existingIdx].amount = amount;
          data.budgets[existingIdx].color = color;
          this.showToast(`Anggaran kategori "${category}" berhasil diperbarui.`, 'success');
        } else {
          const newId = (data.budgets.length > 0 ? Math.max(...data.budgets.map(b => b.id)) : 0) + 1;
          data.budgets.push({
            id: newId,
            category,
            amount,
            color
          });
          this.showToast(`Kategori "${category}" berhasil ditambahkan.`, 'success');
        }

        StorageManager.save(data);
        budgetForm.reset();
        this.renderAll();
      });
    }

    // Form Tambah Target
    const goalForm = document.getElementById('addGoalForm');
    if (goalForm) {
      goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = goalForm.querySelector('input[name="title"]')?.value.trim();
        const rawTarget = goalForm.querySelector('input[name="target"]')?.value || '0';
        const deadline = goalForm.querySelector('input[name="deadline"]')?.value || '';

        const target = Formatters.parseNumber(rawTarget);
        if (!title || target <= 0) {
          this.showToast('Isi nama target dan target nominal dengan benar.', 'error');
          return;
        }

        const data = StorageManager.load();
        const newId = (data.goals.length > 0 ? Math.max(...data.goals.map(g => g.id)) : 0) + 1;

        data.goals.push({
          id: newId,
          title,
          target,
          saved: 0,
          deadline
        });

        StorageManager.save(data);
        this.showToast('Target tabungan baru berhasil dibuat!', 'success');
        goalForm.reset();
        this.renderAll();
      });
    }

    // Form Profil
    const profileForm = document.getElementById('settingsProfileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('settingProfileName')?.value.trim() || 'Andi Pratama';
        const role = document.getElementById('settingProfileRole')?.value.trim() || 'Mahasiswa';
        const rawAllowance = document.getElementById('settingMonthlyAllowance')?.value || '1500000';

        const data = StorageManager.load();
        data.profile = {
          name,
          role,
          campus: "Universitas Indonesia",
          monthlyAllowance: Formatters.parseNumber(rawAllowance)
        };

        StorageManager.save(data);
        this.renderProfile();
        this.showToast('Profil berhasil disimpan.', 'success');
      });
    }

    // Filter Pencarian Transaksi
    const searchInput = document.getElementById('txSearchInput');
    const filterSelect = document.getElementById('txFilterKind');
    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderTransactions(StorageManager.load()));
    }
    if (filterSelect) {
      filterSelect.addEventListener('change', () => this.renderTransactions(StorageManager.load()));
    }
  },

  handleSaveToGoal(e, goalId) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const rawVal = input ? input.value : '0';
    const amount = Formatters.parseNumber(rawVal);

    if (amount <= 0) {
      this.showToast('Masukkan nominal tabungan yang valid.', 'error');
      return;
    }

    const data = StorageManager.load();
    const goal = data.goals.find(g => g.id === goalId);
    if (!goal) return;

    goal.saved = Math.min(goal.target, (Number(goal.saved) || 0) + amount);
    StorageManager.save(data);

    this.showToast(`Berhasil menambah tabungan sebesar ${Formatters.rupiah(amount)}!`, 'success');
    this.renderAll();
  },

  deleteTransactionConfirm(id) {
    if (confirm('Apakah kamu yakin ingin menghapus transaksi ini?')) {
      const data = StorageManager.load();
      data.transactions = data.transactions.filter(t => t.id !== id);
      StorageManager.save(data);
      this.showToast('Transaksi telah dihapus.', 'success');
      this.renderAll();
    }
  },

  deleteBudgetConfirm(id) {
    if (confirm('Hapus kategori anggaran ini?')) {
      const data = StorageManager.load();
      data.budgets = data.budgets.filter(b => b.id !== id);
      StorageManager.save(data);
      this.showToast('Kategori anggaran telah dihapus.', 'success');
      this.renderAll();
    }
  },

  deleteGoalConfirm(id) {
    if (confirm('Hapus target tabungan ini?')) {
      const data = StorageManager.load();
      data.goals = data.goals.filter(g => g.id !== id);
      StorageManager.save(data);
      this.showToast('Target tabungan telah dihapus.', 'success');
      this.renderAll();
    }
  },

  bindCurrencyInputs() {
    document.querySelectorAll('input[inputmode="numeric"]').forEach(input => {
      input.addEventListener('input', (e) => {
        const raw = e.target.value.replace(/[^\d]/g, '');
        if (raw) {
          e.target.value = Number(raw).toLocaleString('id-ID');
        } else {
          e.target.value = '';
        }
      });
    });
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconMap = {
      'success': '✓',
      'error': '✕',
      'warning': '⚠'
    };

    toast.innerHTML = `
      <span style="font-weight: 800; font-size: 15px;">${iconMap[type] || '•'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

// Inisialisasi Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
  UIManager.init();
});
