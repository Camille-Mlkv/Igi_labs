document.addEventListener('DOMContentLoaded', function () {
    // Сортировка по столбцам
    let sortDirection = {
        lastName: 'asc',
        firstName:'asc',
        patronymic:'asc',
        employeeEmail: 'asc',
        employeePhone: 'asc',
    };

    const sortTable = (column) => {
        const table = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
        const rows = Array.from(table.rows);
        const direction = sortDirection[column] === 'asc' ? 1 : -1;

        rows.sort((rowA, rowB) => {
            const cellA = rowA.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
            const cellB = rowB.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
            return cellA.localeCompare(cellB) * direction;
        });

        rows.forEach(row => table.appendChild(row));
        sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';
        updateSortIndicators();
    };

    const getColumnIndex = (column) => {
        switch (column) {
            case 'last_name': return 2;
            case 'first_name': return 3;
            case 'patronymic': return 4;
            case 'phone': return 5;
            case 'email': return 6;
            case 'job_description':return 7;
            default: return 2;
        }
    };

    // Обновление индикаторов сортировки
    const updateSortIndicators = () => {
        const headers = document.querySelectorAll('#employeeTable th[data-sort]');
        headers.forEach(header => {
            header.classList.remove('sort-asc', 'sort-desc');  // Убираем старые индикаторы
            const column = header.getAttribute('data-sort');
            if (sortDirection[column] === 'asc') {
                header.classList.add('sort-asc');
            } else {
                header.classList.add('sort-desc');
            }
        });
    };

    // Добавление функционала отображения строки
    const tableRows = document.querySelectorAll('#employeeTable tbody tr');
    const detailBlock = document.getElementById('detailBlock');

    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            const cells = Array.from(row.cells);
            const details = cells.map(cell => cell.textContent.trim()).join(' | ');
            detailBlock.textContent = `Выбранная строка: ${details}`;
        });
    });



    // Слушатели нажатия для заголовков таблицы
    const headerCells = document.querySelectorAll('#employeeTable th[data-sort]');
    headerCells.forEach(cell => {
        cell.addEventListener('click', () => {
            sortTable(cell.getAttribute('data-sort'));
        });
    });

    // Пагинация
    let currentPage = 1;
    const pageSize = 3;
    const paginateTable = (visibleRows = null) => {
        const rows = visibleRows || Array.from(document.querySelectorAll('#employeeTable tbody tr'));
        const totalRows = rows.length;
        const totalPages = Math.ceil(totalRows / pageSize);
    
        rows.forEach((row, index) => {
            row.style.display = index >= (currentPage - 1) * pageSize && index < currentPage * pageSize ? '' : 'none';
        });
    
        // Обновляем кнопки пагинации
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.onclick = () => {
                currentPage = i;
                paginateTable(visibleRows); // Пагинация только по видимым строкам
            };
            pagination.appendChild(button);
        }
    };

    // Фильтрация
    document.getElementById('searchButton').addEventListener('click', () => {
        const searchText = document.getElementById('searchInput').value.toLowerCase();
        //console.log(searchText)
        const rows = Array.from(document.querySelectorAll('#employeeTable tbody tr'));
        const filteredRows = rows.filter(row => {
            const cells = Array.from(row.getElementsByTagName('td'));
            return cells.some(cell => cell.textContent.toLowerCase().includes(searchText));
        });
        rows.forEach(row => (row.style.display = 'none'));
        filteredRows.forEach(row => (row.style.display = ''));
    
        paginateTable(filteredRows); // Обновляем пагинацию после фильтрации
    });
    

    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', () => {
            const addEmployeeForm = document.getElementById('addEmployeeForm');
            if (addEmployeeForm) {
                addEmployeeForm.style.display = addEmployeeForm.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Функция для проверки корректности заполнения формы
    function validateForm() {
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const patronymic = document.getElementById('patronymic').value;
        const email = document.getElementById('employeeEmail').value;
        const url = document.getElementById('employeeUrl').value;
        const phone = document.getElementById('employeePhone').value;
        const description = document.getElementById('employeeDescription').value;

        // Проверка на корректность заполнения всех полей
        const isFormValid = lastName && firstName && patronymic && email && url && phone && description;
        
        // Активируем или деактивируем кнопку в зависимости от валидности формы
        document.getElementById('submitBtn').disabled = !isFormValid;
    }

    // Валидация URL и телефона
    const validateURL = (url) => /^(https?:\/\/[^\s]+(\.php|\.html))$/.test(url);
    // Проверка для номеров, начинающихся на +375
    const validatePhonePlus375 = (phone) => 
        /^\+375\s?\(?\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone);

    // Проверка для номеров, начинающихся на 8
    const validatePhone8 = (phone) => 
        /^8\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone);

    // Универсальная проверка: выбирает функцию в зависимости от префикса
    const validatePhone = (phone) => {
        if (phone.startsWith('+375')) {
            return validatePhonePlus375(phone);
        } else if (phone.startsWith('8')) {
            return validatePhone8(phone);
        } else {
            return false; // Если номер не начинается с +375 или 8
        }
    };
    

    const applyValidationStyles = (input, isValid) => {
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    };
    function resetValidationStyles() {
        const inputs = document.querySelectorAll('#employeeForm input, #employeeForm textarea');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    }

    // Проверяем, доступен ли интерфейс для администратора
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    if (addEmployeeForm) {
        // Обработчики для формы добавления сотрудника
        document.getElementById('lastName').addEventListener('input', validateForm);
        document.getElementById('firstName').addEventListener('input', validateForm);
        document.getElementById('patronymic').addEventListener('input', validateForm);
        document.getElementById('employeeEmail').addEventListener('input', validateForm);
        document.getElementById('employeeUrl').addEventListener('input', validateForm);
        document.getElementById('employeePhone').addEventListener('input', validateForm);
        document.getElementById('employeeDescription').addEventListener('input', validateForm);

        // Обработчик формы добавления
        document.getElementById('employeeForm').addEventListener('submit', function (e) {
            e.preventDefault();


            const lastName = document.getElementById('lastName').value.trim();
            const firstName = document.getElementById('firstName').value.trim();
            const patronymic = document.getElementById('patronymic').value.trim();
            const email = document.getElementById('employeeEmail').value.trim();
            const url = document.getElementById('employeeUrl').value.trim();
            const phone = document.getElementById('employeePhone').value.trim();
            const description = document.getElementById('employeeDescription').value.trim();

            const errors = [];
            const formErrorsDiv = document.getElementById('formError');

            // Валидация ФИО
            if (!lastName) {
                applyValidationStyles(document.getElementById('lastName'), false);
                errors.push('Поле "Фамилия" не должно быть пустым.');
            }
            if (!firstName) {
                applyValidationStyles(document.getElementById('firstName'), false);
                errors.push('Поле "Имя" не должно быть пустым.');
            }
            if (!patronymic) {
                applyValidationStyles(document.getElementById('patronymic'), false);
                errors.push('Поле "Отчество" не должно быть пустым.');
            }

            // Валидация email
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                applyValidationStyles(document.getElementById('employeeEmail'), false);
                errors.push('Введите корректный email.');
            }

            // Валидация URL
            if (!validateURL(url)) {
                applyValidationStyles(document.getElementById('employeeUrl'), false);
                errors.push('Введите корректный URL.');
            }

            // Валидация телефона
            if (!validatePhone(phone)) {
                applyValidationStyles(document.getElementById('employeePhone'), false);
                errors.push('Введите корректный номер телефона.');
            }

            // Валидация описания
            if (!description) {
                applyValidationStyles(document.getElementById('employeeDescription'), false);
                errors.push('Поле "Описание работ" не должно быть пустым.');
            }

            // Если есть ошибки, отображаем их и выходим
            if (errors.length > 0) {
                formErrorsDiv.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
                formErrorsDiv.style.color = 'red'; // Работает корректно
                return;
            }

            showPreloader();
            setTimeout(() => {
                hidePreloader(); 
            }, 1500);
            setTimeout(()=>{
                alert('Employee added.')
            },1700);

            // Если ошибок нет, добавляем данные в таблицу
            formErrorsDiv.innerHTML = '';

            
            //const tableRows = document.querySelectorAll('#employeeTable tbody tr');

            const table = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            newRow.innerHTML = `
                <tr>
                <td><input type="checkbox" class="employeeCheckbox"></td>
                <td>${lastName}</td>
                <td>${firstName}</td>
                <td>${patronymic}</td>
                <td>${phone}</td>
                <td><a href="mailto:${email}">${email}</a></td>
                <td>${description}</td>
                <td><img src="${url}" alt="${firstName}" class="employee-photo" height="100px" width="80px"></td>
                </tr>
            `;

            // Очистка формы
            document.getElementById('employeeForm').reset();
            document.getElementById('submitBtn').disabled = true;
            resetValidationStyles();

            paginateTable();
        });

        // Обработчик премирования
        const rewardButton = document.getElementById('rewardButton');
        if (rewardButton) {
            rewardButton.addEventListener('click', () => {
                const selectedEmployees = [];
                document.querySelectorAll('.employeeCheckbox:checked').forEach(checkbox => {
                    selectedEmployees.push(checkbox.closest('tr').cells[1].textContent); // Получаем ФИО
                });
                const rewardMessage = selectedEmployees.length
                    ? `Премированы следующие сотрудники: ${selectedEmployees.join(', ')}.`
                    : 'Никто не выбран для премирования.';
                document.getElementById('rewardMessage').textContent = rewardMessage;
            });
        }
    }

    paginateTable(); // Инициализация пагинации

    function showPreloader() {
        document.getElementById('preloader').style.visibility='visible'; // Показать прелоадер
    }
    
    function hidePreloader() {
        document.getElementById('preloader').style.visibility='hidden'; // Скрыть прелоадер
    }
    

});


