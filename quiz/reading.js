// vocabulary.js

// Soal dan jawabannya
const questions = [
    {
        question: "What is Raihan interest?",
        options: {
            a: "Coocking",
            b: "Painting",
            c: "Martial Arts",
            d: "Playing Games"
        },
        correctAnswer: "c"
    },
    {
        question: "Raihan's elder brother is..",
        options: {
            a: "Silma",
            b: "Evan",
            c: "Noval",
            d: "Tina"
        },
        correctAnswer: "c"
    },
    {
        question: "Raihan has one brother and ... sister.",
        options: {
            a: "One",
            b: "Five",
            c: "Two",
            d: "Four"
        },
        correctAnswer: "a"
    }
];

let currentQuestionIndex = 0;
let score = 0; // Variabel untuk menyimpan skor

// Fungsi untuk menampilkan soal
function showQuestion() {
    const questionElement = document.getElementById("quiz-question");
    const optionsElement = document.getElementById("quiz-options");
    const resultElement = document.getElementById("result");
    
    // Hapus hasil sebelumnya
    resultElement.innerHTML = "";

    // Tampilkan soal
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    // Tampilkan opsi
    optionsElement.innerHTML = "";
    for (const key in currentQuestion.options) {
        const option = currentQuestion.options[key];
        optionsElement.innerHTML += `
            <label>
                <input type="radio" name="option" value="${key}">
                ${key.toUpperCase()}. ${option}
            </label><br>
        `;
    }
}

// Fungsi untuk berpindah ke soal berikutnya
// Fungsi untuk berpindah ke soal berikutnya
function nextQuestion() {
    const options = document.getElementsByName("option");
    let selectedAnswer = "";

    // Cari jawaban yang dipilih
    for (const option of options) {
        if (option.checked) {
            selectedAnswer = option.value;
            break;
        }
    }

    const resultElement = document.getElementById("result");

    // Jika tidak ada jawaban yang dipilih
    if (selectedAnswer === "") {
        resultElement.innerText = "Please select an answer.";
        resultElement.style.color = "red";
        return;
    }

    // Periksa jawaban
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        resultElement.innerText = "Correct!";
        resultElement.style.color = "green";
        score++; // Tambahkan skor jika jawaban benar
    } else {
        resultElement.innerText = `Incorrect! The correct answer is "${currentQuestion.correctAnswer.toUpperCase()}".`;
        resultElement.style.color = "red";
    }

    // Pindah ke soal berikutnya jika ada
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setTimeout(() => showQuestion(), 1500); // Tunda sejenak sebelum pindah soal
    } else {
        // Selesai
        setTimeout(() => {
            document.getElementById("quiz-header").style.display = "none";
            // Hitung nilai dalam skala 0-100
            const finalScore = Math.round((score / questions.length) * 100);
        
            // Simpan hasil ke localStorage
            const studentName = prompt("Enter your name to save the results:");
            if (studentName) {
                const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
                storedResults.push({
                    name: studentName,
                    quizTitle: "Reading Quiz",
                    score: finalScore
                });
                localStorage.setItem("quizResults", JSON.stringify(storedResults));
            }
        
            document.querySelector(".quiz-content").innerHTML = `
                <h3>Quiz Complete!</h3>
                <p>Your score is: ${finalScore}</p>
                <p>Thank you for participating.</p>
                <button class="btn-home" onclick="goHome()">MENU</button>
            `;
        }, 1500);
    }
}

// Fungsi untuk kembali ke halaman Home
function goHome() {
    location.href = "../home.html";
}

// Tampilkan soal pertama saat halaman dimuat
window.onload = showQuestion;