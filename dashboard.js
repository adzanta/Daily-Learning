// Fungsi untuk membaca hasil kuis dari localStorage
function fetchQuizResults() {
    return JSON.parse(localStorage.getItem("quizResults")) || [];
}

// Fungsi untuk menampilkan hasil kuis di tabel
function renderResults() {
    const tableBody = document.querySelector("#results-table tbody");
    const quizResults = fetchQuizResults();

    // Kosongkan tabel sebelum mengisi
    tableBody.innerHTML = "";

    // Tambahkan data ke tabel
    quizResults.forEach((result, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.name}</td>
            <td>${result.quizTitle}</td>
            <td>${result.score}</td>
        `;
        tableBody.appendChild(row);
    });

    // Jika tidak ada data, tampilkan pesan
    if (quizResults.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4">No quiz results found</td></tr>`;
    }
}

// Fungsi untuk menghapus semua hasil
function clearResults() {
    if (confirm("Are you sure you want to clear all results?")) {
        localStorage.removeItem("quizResults");
        renderResults();
    }
}

// Fungsi untuk menyegarkan halaman
function refreshPage() {
    renderResults();
}

// Panggil fungsi untuk menampilkan hasil saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderResults);