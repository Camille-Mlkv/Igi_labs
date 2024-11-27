// Получаем все бутылки
const bottles = document.querySelectorAll(".bottle");

// Обработчик скроллинга
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    bottles.forEach((bottle, index) => {
        // Рассчитываем смещение бутылок в зависимости от прокрутки
        const offset = scrollY * (0.2 + index * 0.1);

        // Перемещаем бутылки по вертикали и горизонтали
        bottle.style.transform = `translate(${offset}px, ${scrollY * 0.1}px) rotate(${Math.sin(scrollY / 100 + index) * 10}deg)`;
    });
});
