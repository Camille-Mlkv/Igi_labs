// Функция для применения стилей
function applyStyles() {
    const fontSize = localStorage.getItem('fontSize');
    const fontColor = localStorage.getItem('fontColor');
    const bgColor = localStorage.getItem('bgColor');
    const headerColor = localStorage.getItem('headerColor');

    const body = document.body;
    if (fontSize) body.style.fontSize = fontSize;
    if (fontColor) body.style.color = fontColor;
    if (bgColor) body.style.backgroundColor = bgColor;
    if (headerColor) {
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((header) => {
            header.style.color = headerColor;
        });
    }
}

window.addEventListener('DOMContentLoaded', applyStyles);