// --- Data Kegiatan Ilustrasi (Gunakan format YYYY-MM-DD) ---
// Karena hari ini adalah 4 Desember 2025 (Kamis), kalender akan menampilkan Desember 2025 secara default.
const activities = [
  { date: "2025-12-04", name: "Rakor Peningkatan Produktivitas" }, // Hari ini!
  { date: "2025-12-10", name: "Pelatihan Budidaya Jagung" },
  { date: "2025-12-10", name: "Peninjauan Irigasi Tersier" },
  { date: "2025-12-18", name: "Bimtek Pengelolaan Keuangan Gapoktan" },
  { date: "2025-12-25", name: "Monitoring Distribusi Benih Unggul" },
];

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid");
// Inisialisasi Flowbite Modal
const modal = new Flowbite.Modal(document.getElementById("activity-modal"));

function initSelectors() {
  const today = new Date();
  // Gunakan tanggal hari ini (4 Desember 2025) untuk default
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Isi Opsi Bulan
  monthNames.forEach((name, index) => {
    const option = new Option(name, index);
    if (index === currentMonth) option.selected = true;
    monthSelect.add(option);
  });

  // Isi Opsi Tahun
  for (let i = currentYear - 1; i <= currentYear + 3; i++) {
    const option = new Option(i, i);
    if (i === currentYear) option.selected = true;
    yearSelect.add(option);
  }
}

function renderCalendar() {
  const selectedMonth = parseInt(monthSelect.value);
  const selectedYear = parseInt(yearSelect.value);

  // 1. Hitung Hari Pertama dan Jumlah Hari dalam Bulan
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); // 0=Minggu, 1=Senin...
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  calendarGrid.innerHTML = ""; // Kosongkan grid

  // 2. Tambahkan Kotak Kosong (Padding) untuk Hari Minggu-Sabtu
  for (let i = 0; i < firstDayOfMonth; i++) {
    // Menggunakan bg-gray-100 agar terlihat sebagai kotak non-aktif
    calendarGrid.innerHTML += '<div class="h-20 bg-gray-100 rounded-md"></div>';
  }

  // 3. Tambahkan Kotak Tanggal
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDateString = `${selectedYear}-${String(
      selectedMonth + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayActivities = activities.filter(
      (a) => a.date === currentDateString
    );

    let dayClasses =
      "h-20 p-1 rounded-lg border text-sm relative transition-colors duration-200 cursor-pointer";
    let activityBadge = "";
    let activityListHtml = "";

    // Cek apakah tanggal hari ini (untuk penandaan khusus)
    const today = new Date();
    const isToday =
      selectedYear === today.getFullYear() &&
      selectedMonth === today.getMonth() &&
      day === today.getDate();

    if (isToday) {
      dayClasses += " border-2 border-red-500 bg-yellow-100 shadow-lg z-10"; // Hari ini ditandai merah
    } else {
      dayClasses += " border-gray-300 bg-white hover:bg-green-50";
    }

    // Jika ada kegiatan (prioritas warna)
    if (dayActivities.length > 0) {
      // Warna penanda kegiatan, kecuali jika hari itu adalah hari ini
      if (!isToday) {
        dayClasses += " border-[#374A37] bg-green-100 hover:bg-green-200";
      }

      activityBadge = `<span class="absolute top-1 right-1 text-xs font-medium bg-[#374A37] text-white px-1 py-0.5 rounded-full">${dayActivities.length}</span>`;

      // Tampilkan 1 kegiatan dan sisanya di modal
      activityListHtml = `<div class="mt-1 text-xs text-gray-800 truncate">${dayActivities[0].name}</div>`;
      if (dayActivities.length > 1) {
        activityListHtml += `<div class="text-xs text-gray-500 mt-0.5">+ ${
          dayActivities.length - 1
        } lainnya</div>`;
      }
    }

    // Buat Kotak Tanggal
    const dayBox = document.createElement("div");
    dayBox.className = dayClasses;
    dayBox.innerHTML = `
        <div class="font-bold text-gray-900">${day}</div>
        ${activityBadge}
        ${activityListHtml}
      `;

    // Tambahkan event listener untuk membuka modal
    dayBox.onclick = () =>
      showActivityModal(dayActivities, day, selectedMonth, selectedYear);

    calendarGrid.appendChild(dayBox);
  }
}

function showActivityModal(dayActivities, day, month, year) {
  const modalDate = document.getElementById("modal-date");
  const modalActivities = document.getElementById("modal-activities");

  modalDate.textContent = `Kegiatan pada ${day} ${monthNames[month]} ${year}`;
  modalActivities.innerHTML = "";

  if (dayActivities.length === 0) {
    modalActivities.innerHTML =
      '<p class="text-gray-500">Tidak ada kegiatan terjadwal pada tanggal ini.</p>';
  } else {
    const ul = document.createElement("ul");
    ul.className = "list-disc ml-4 space-y-2";
    dayActivities.forEach((activity) => {
      const li = document.createElement("li");
      li.className = "text-gray-800 font-medium";
      li.textContent = activity.name;
      ul.appendChild(li);
    });
    modalActivities.appendChild(ul);
  }

  modal.show();
}

// --- Inisialisasi Awal ---
initSelectors();
renderCalendar();
