// / STATISTIK

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

// LAYANAN DINAS

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".animate-item");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const direction = item.getAttribute("data-direction");
          const delay = parseInt(item.getAttribute("data-delay") || "0");

          // 1. Tentukan posisi awal
          if (direction === "left") {
            item.classList.add("opacity-0", "-translate-x-12"); // Mulai dari kiri
          } else if (direction === "right") {
            item.classList.add("opacity-0", "translate-x-12"); // Mulai dari kanan
          }

          // 2. Terapkan kelas transisi untuk efek yang mulus
          item.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`;

          // 3. Hapus kelas 'opacity-0' dan 'translate-x' setelah penundaan (delay)
          setTimeout(() => {
            item.classList.remove(
              "opacity-0",
              "-translate-x-12",
              "translate-x-12"
            );
            // Opsional: Hapus style transisi setelah selesai
            setTimeout(() => {
              item.style.transition = "";
            }, 600); // 600ms = durasi transisi
          }, delay);

          // Berhenti mengamati setelah item muncul
          observer.unobserve(item);
        }
      });
    },
    {
      threshold: 0.2, // Pemicu ketika 20% elemen terlihat
    }
  );

  items.forEach((item) => {
    observer.observe(item);
  });
});
