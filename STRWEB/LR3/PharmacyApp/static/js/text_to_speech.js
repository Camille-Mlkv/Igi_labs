// Получаем элементы кнопок
const speakButton = document.getElementById("speak-history-button");
const stopButton = document.getElementById("stop-history-button");

// Событие для кнопки "Озвучить текст"
speakButton.addEventListener("click", () => {
    const text = document.getElementById("company-history-text").innerText;

    if (!text) {
        alert("Текст для озвучивания отсутствует!");
        return;
    }

    // Создаём объект синтеза речи
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "rus-RU"; // Устанавливаем язык
    utterance.rate = 1; // Скорость речи
    utterance.pitch = 1; // Тон речи

    // Начинаем озвучивание
    speechSynthesis.speak(utterance);
});

// Событие для кнопки "Остановить"
stopButton.addEventListener("click", () => {
    // Остановка всех активных речевых операций
    speechSynthesis.cancel();
});