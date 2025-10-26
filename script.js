document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pmbForm");
  const formCard = document.getElementById("formCard");
  const resultCard = document.getElementById("resultCard");
  const resultContent = document.getElementById("resultContent");
  const backBtn = document.getElementById("backBtn");
  const year = document.getElementById("y");

  year.textContent = new Date().getFullYear();

  // ===== Fungsi Error Message =====
  function showError(input, message) {
    let error = input.parentElement.querySelector(".error-message");
    if (!error) {
      error = document.createElement("div");
      error.className = "error-message";
      input.parentElement.insertBefore(error, input.nextSibling);
    }
    error.textContent = message;
    input.classList.add("invalid");
  }

  function clearError(input) {
    let error = input.parentElement.querySelector(".error-message");
    if (error) error.textContent = "";
    input.classList.remove("invalid");
  }

  // ===== Submit Form =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    let firstInvalid = null;

    // Hapus error sebelumnya
    form.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));

    // 1️⃣ Validasi Semua Input Required
    const requiredFields = form.querySelectorAll("input[required], select[required], textarea[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        showError(field, "Kolom ini wajib diisi.");
        if (!firstInvalid) firstInvalid = field;
        valid = false;
      } else {
        clearError(field);
      }
    });

    // 2️⃣ Regex NIM → hanya angka (contoh 10 digit)
    const nim = form.querySelector("#nim");
    if (nim && nim.value.trim()) {
      const regexNIM = /^\d+$/;
      if (!regexNIM.test(nim.value.trim())) {
        showError(nim, "NIM hanya boleh berisi angka saja.");
        if (!firstInvalid) firstInvalid = nim;
        valid = false;
      } else if (nim.value.trim().length !== 10) {
        showError(nim, "NIM harus 10 digit angka.");
        if (!firstInvalid) firstInvalid = nim;
        valid = false;
      } else {
        clearError(nim);
      }
    }

    // 3️⃣ Regex Nama → huruf, spasi, titik, dan apostrof
    const nama = form.querySelector("#nama");
    if (nama && nama.value.trim()) {
      const regexNama = /^[A-Za-z\s'.]+$/;
      if (!regexNama.test(nama.value.trim())) {
        showError(nama, "Nama hanya boleh huruf, spasi, titik, dan apostrof.");
        if (!firstInvalid) firstInvalid = nama;
        valid = false;
      } else {
        clearError(nama);
      }
    }

    // 4️⃣ Jurusan wajib diisi
    const jurusan = form.querySelector("#jurusan");
    if (jurusan && !jurusan.value.trim()) {
      showError(jurusan, "Jurusan wajib diisi.");
      if (!firstInvalid) firstInvalid = jurusan;
      valid = false;
    } else {
      clearError(jurusan);
    }

    // 5️⃣ Alamat minimal 10 karakter
    const alamat = form.querySelector("#alamat");
    if (alamat && alamat.value.trim().length < 10) {
      showError(alamat, "Alamat minimal 10 karakter.");
      if (!firstInvalid) firstInvalid = alamat;
      valid = false;
    } else {
      clearError(alamat);
    }

    // 🚨 Jika ada error → fokus ke input pertama yang salah
    if (!valid) {
      firstInvalid.focus();
      return;
    }

    // 6️⃣ Jika semua valid → tampilkan hasil
    const data = new FormData(form);
    let output = "<div class='result-section'><h3>📋 Data Pendaftaran</h3><table>";

    for (let [key, value] of data.entries()) {
      if (value instanceof File && value.name !== "") {
        output += `<tr><td>${key}</td><td>${value.name}</td></tr>`;
      } else if (value !== "") {
        output += `<tr><td>${key}</td><td>${value}</td></tr>`;
      }
    }

    output += "</table></div>";

    resultContent.innerHTML = output;
    formCard.style.display = "none";
    resultCard.style.display = "block";
    window.scrollTo(0, 0);
  });

  // Tombol kembali
  backBtn.addEventListener("click", () => {
    resultCard.style.display = "none";
    formCard.style.display = "block";
    form.reset();
    window.scrollTo(0, 0);
  });
});
