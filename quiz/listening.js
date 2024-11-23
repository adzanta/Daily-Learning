// Soal dan file audio
const questions = [
    {
        question: "What time does the speaker leave the house in the morning?",
        options: {
            a: "6:00 a.m",
            b: "6:30 a.m",
            c: "7:00 a.m",
            d: "7:30 a.m"
        },
        correctAnswer: "c",
        audio: "../audio/listening.mp4",
        played: false 
    },
    {
        question: "What does the speaker do after school?",
        options: {
            a: "Helps their parents with chores",
            b: "Prepares the bag for the next day",
            c: "Watches TV or reads a book.",
            d: "Goes to bed early"
        },
        correctAnswer: "c",
        audio: "../audio/listening.mp4",
        played: false
    },
    {
        question: "Which two activities does the speaker do in the evening?",
        options: {
            a: "Plays sports and watches TV",
            b: "Helps with house chores and prepares their bag",
            c: "Does homework and goes to bed",
            d: "Cleans the house and eats dinner"
        },
        correctAnswer: "b",
        audio: "../audio/listening.mp4",
        played: false
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Fungsi untuk menampilkan soal
function showQuestion() {
    const questionElement = document.getElementById("quiz-question");
    const optionsElement = document.getElementById("quiz-options");
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    const resultElement = document.getElementById("result");

    // Hapus hasil sebelumnya
    resultElement.innerHTML = "";

    // Ambil soal saat ini
    const currentQuestion = questions[currentQuestionIndex];

    // Tampilkan soal
    questionElement.innerText = currentQuestion.question;

    // Tampilkan audio
    if (!currentQuestion.played) {
        audioSource.src = currentQuestion.audio;
        audioPlayer.load(); // Memuat ulang audio
        audioPlayer.controls = true; // Aktifkan kontrol audio
        audioPlayer.style.pointerEvents = "auto"; // Aktifkan elemen audio

        // Tambahkan event listener untuk mendeteksi selesai
        audioPlayer.onended = () => {
            audioPlayer.controls = false; // Nonaktifkan kontrol setelah selesai
            audioPlayer.style.pointerEvents = "none"; // Mencegah pemutaran ulang
            currentQuestion.played = true; // Tandai bahwa audio telah diputar
        };
    } else {
        audioSource.src = ""; // Kosongkan sumber audio
        audioPlayer.controls = false; // Nonaktifkan kontrol audio
        resultElement.innerText = "You have already played this audio.";
        resultElement.style.color = "red";
    }

    // Tampilkan opsi jawaban
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
        score++;
    } else {
        resultElement.innerText = `Incorrect! The correct answer is "${currentQuestion.correctAnswer.toUpperCase()}".`;
        resultElement.style.color = "red";
    }

    // Pindah ke soal berikutnya jika ada
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setTimeout(() => showQuestion(), 1500); // Tunda sejenak sebelum pindah soal
    } else {
        // Kuis selesai
        setTimeout(() => {
            document.getElementById("quiz-header").style.display = "none"
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
