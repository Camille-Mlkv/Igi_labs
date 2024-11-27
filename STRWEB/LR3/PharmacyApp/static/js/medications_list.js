document.querySelectorAll('.medication-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;//горизонтальное положение указателя мыши относительно левого края элемента.
        const y = e.clientY - rect.top;

        const rotateX = (((y / rect.height) - 0.5) * 10)*10; //пропорциональное положение мыши по вертикали относительно высоты элемента (от 0 до 1).
        const rotateY = (((x / rect.width) - 0.5) * -10)*10;
        item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotateX(0) rotateY(0)';
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 3; // Количество товаров на странице
    const items = document.querySelectorAll(".medication-item");
    const paginationControls = document.getElementById("pagination-controls");

    const totalPages = Math.ceil(items.length / itemsPerPage);

    function showPage(page) {
        // Скрываем все элементы
        items.forEach((item, index) => {
            item.classList.remove("active");
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                item.classList.add("active");
            }
        });
    }

    function createPaginationButtons() {
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("pagination-button");
            if (i === 1) button.classList.add("active");

            button.addEventListener("click", () => {
                document.querySelectorAll(".pagination-button").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                showPage(i);
            });

            paginationControls.appendChild(button);
        }
    }

    // Инициализация
    showPage(1); // Показываем первую страницу
    createPaginationButtons(); // Создаем кнопки пагинации
});
