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
