function showAlert(){
    alert('settings submitted')
}


document.getElementById('toggleSettings').addEventListener('change', function () {
    const settingsContainer = document.getElementById('style_advanced_settings');
    
    // Если чекбокс отмечен, создаем элементы
    if (this.checked) {
        // Очищаем контейнер (на случай повторного создания)
        settingsContainer.innerHTML = '';

        // Создаем элементы
        const fontSizeLabel = document.createElement('label');
        fontSizeLabel.textContent = 'Размер шрифта: ';
        const fontSizeInput = document.createElement('input');
        fontSizeInput.type = 'text';
        fontSizeInput.id = 'fontSizeInput';
        fontSizeInput.placeholder = 'Например: 16px';
        fontSizeLabel.appendChild(fontSizeInput);

        const fontColorLabel = document.createElement('label');
        fontColorLabel.textContent = 'Цвет шрифта: ';
        const fontColorInput = document.createElement('input');
        fontColorInput.type = 'color';
        fontColorInput.id = 'fontColorInput';
        fontColorLabel.appendChild(fontColorInput);

        const bgColorLabel = document.createElement('label');
        bgColorLabel.textContent = 'Цвет фона: ';
        const bgColorInput = document.createElement('input');
        bgColorInput.type = 'color';
        bgColorInput.id = 'bgColorInput';
        bgColorLabel.appendChild(bgColorInput);

        const applyButton = document.createElement('button');
        applyButton.id = 'applyStylesButton';
        applyButton.textContent = 'Применить';

        // Добавляем элементы в контейнер
        settingsContainer.appendChild(fontSizeLabel);
        settingsContainer.appendChild(document.createElement('br'));
        settingsContainer.appendChild(fontColorLabel);
        settingsContainer.appendChild(document.createElement('br'));
        settingsContainer.appendChild(bgColorLabel);
        settingsContainer.appendChild(document.createElement('br'));
        settingsContainer.appendChild(applyButton);

        // Привязываем обработчик для кнопки
        applyButton.addEventListener('click', handleApplyButtonClick);
    } else {
        // Если чекбокс снят, удаляем элементы
        settingsContainer.innerHTML = '';
    }
});

function handleApplyButtonClick() {
    console.log('inside applyStylesButton click');
    
    // Получаем значения из полей ввода
    const fontSize = document.getElementById('fontSizeInput')?.value || '';
    const fontColor = document.getElementById('fontColorInput')?.value || '';
    const bgColor = document.getElementById('bgColorInput')?.value || '';
    const headerColor = document.getElementById('fontColorInput')?.value || '';

    // Сохраняем значения в localStorage, если они указаны
    if (fontSize) localStorage.setItem('fontSize', fontSize);
    if (fontColor) localStorage.setItem('fontColor', fontColor);
    if (bgColor) localStorage.setItem('bgColor', bgColor);
    if (headerColor) localStorage.setItem('headerColor', headerColor);

    // Применяем изменения сразу
    applyStyles();
}
