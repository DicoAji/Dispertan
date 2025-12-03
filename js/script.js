document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");

  // Kelas Tailwind yang akan digunakan
  const transparentClass = "bg-transparent";
  const scrolledClass = "bg-[#374A37]";

  // Fungsi untuk mengecek posisi scroll dan mengubah kelas
  const handleScroll = () => {
    if (window.scrollY > 50) {
      // Angka 50 bisa diubah sesuai kebutuhan Anda
      // Jika sudah discroll ke bawah
      header.classList.remove(transparentClass);
      header.classList.add(scrolledClass);
    } else {
      // Jika masih di paling atas
      header.classList.remove(scrolledClass);
      header.classList.add(transparentClass);
    }
  };

  // Tambahkan event listener untuk mendengarkan aktivitas scroll
  window.addEventListener("scroll", handleScroll);

  // Panggil sekali saat dimuat untuk menyesuaikan jika halaman dimuat pada posisi scroll > 50
  handleScroll();
});
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Kelas Tailwind untuk Scroll
  const transparentClass = "bg-transparent";
  const scrolledClass = "bg-[#374A37]";

  // --- 1. Fungsionalitas Scroll Header ---
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.remove(transparentClass);
      header.classList.add(scrolledClass);
    } else {
      header.classList.remove(scrolledClass);
      header.classList.add(transparentClass);
    }
  };

  // --- 2. Fungsionalitas Menu Utama Mobile (Hamburger) ---
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      // Mengganti kelas 'hidden' untuk menampilkan/menyembunyikan menu mobile
      mobileMenu.classList.toggle("hidden");
    });
  }

  // --- 3. Fungsionalitas Sub-Menu (Akordeon) di Mobile ---
  const dropdownButtons = document.querySelectorAll(".mobile-dropdown-button");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Cari elemen content (ul) dan icon di dalam parent (li)
      const parentLi = button.closest(".mobile-dropdown-parent");
      const content = parentLi.querySelector(".mobile-dropdown-content");
      const icon = button.querySelector(".mobile-dropdown-icon");

      // Toggle kelas 'hidden' pada sub-menu
      content.classList.toggle("hidden");

      // Putar ikon panah
      icon.classList.toggle("rotate-180");
    });
  });

  // --- 4. Periksa Ukuran Layar Saat Resize ---
  const checkResize = () => {
    // Periksa menggunakan breakpoint 'lg' (1024px) sesuai permintaan Anda
    if (window.innerWidth >= 1024) {
      // Pastikan menu utama mobile tertutup saat di desktop (lg ke atas)
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  };

  // Tambahkan semua event listener
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", checkResize);

  // Panggil fungsi sekali saat dimuat untuk mengatur state awal
  handleScroll();
  checkResize();
});

// Fungsi untuk memformat angka dengan akhiran yang benar (K, M, +)
function formatNumber(num, targetString) {
  if (targetString.includes("+")) {
    return num.toLocaleString() + "+";
  }
  if (targetString.includes("M")) {
    // Karena kita menggunakan 1.5M, kita akan format dengan 1 desimal jika perlu
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
  }
  if (targetString.includes("K")) {
    // Kita akan format dengan K jika angkanya besar
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
  }
  return num.toLocaleString();
}

// Fungsi utama untuk menganimasikan angka
function startCounter(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const targetValue = parseInt(element.getAttribute("data-target"));
      const duration = 2000; // Durasi animasi dalam milidetik (2 detik)
      let startTimestamp;

      const originalText = element.textContent; // Simpan teks aslinya (misalnya "1.5M")

      // Set nilai awal ke 0 sebelum memulai animasi
      element.textContent = formatNumber(0, originalText);

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        const percentage = Math.min(progress / duration, 1);

        const currentValue = Math.floor(percentage * targetValue);

        // Update tampilan dengan angka yang diformat
        element.textContent = formatNumber(currentValue, originalText);

        if (percentage < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Pastikan nilai akhir adalah nilai target yang diformat dengan benar
          element.textContent = originalText;
        }
      };

      window.requestAnimationFrame(step);
      observer.unobserve(element); // Berhenti mengamati setelah animasi selesai
    }
  });
}

// Inisialisasi Intersection Observer
const counters = document.querySelectorAll(".counter");

// Simpan nilai target asli ke dalam textContent sebelum memulai (misalnya: 20+)
counters.forEach((counter) => {
  const target = counter.getAttribute("data-target");

  // Memformat target string untuk memastikan output benar setelah animasi
  if (target === "20") {
    counter.textContent = "20+";
  } else if (target === "1500000") {
    counter.textContent = "1.5M";
  } else if (target === "15000") {
    counter.textContent = "15K";
  } else if (target === "1200000") {
    counter.textContent = "1.2M";
  } else {
    counter.textContent = target; // Fallback jika tidak ada akhiran
  }
});

const observer = new IntersectionObserver(startCounter, {
  root: null, // Mengamati viewport
  threshold: 0.5, // Mulai animasi ketika 50% elemen terlihat
});

counters.forEach((counter) => {
  observer.observe(counter);
});
