document.addEventListener("DOMContentLoaded", function () {
    const oneHour = 3600000; // 1 час в миллисекундах
    const timerElement = document.getElementById('timer');

    if (!timerElement) {
        console.warn('Элемент таймера не найден.');
        return;
    }

    // Проверяем, есть ли время начала в localStorage
    let startTime = localStorage.getItem('countdown_start_time');

    if (!startTime) {
        // Если нет, устанавливаем текущее время как время начала
        startTime = new Date().getTime();
        localStorage.setItem('countdown_start_time', startTime);
    }

    const endTime = parseInt(startTime) + oneHour;

    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            timerElement.innerText = "Время вышло!";
            localStorage.removeItem('countdown_start_time'); // Сброс времени после завершения
            return;
        }

        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timerElement.innerText = `${minutes} мин ${seconds} сек`;

        setTimeout(updateTimer, 1000); // Обновляем каждую секунду
    }

    updateTimer();
});
