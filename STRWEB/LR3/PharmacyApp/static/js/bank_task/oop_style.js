 // Базовый класс для человека
 class Person {
    constructor(surname, name, patronymic) {
      this.surname = surname;
      this.name = name;
      this.patronymic = patronymic;
    }

    getFullName() {
      return `${this.surname} ${this.name} ${this.patronymic}`;
    }
  }

  // Наследник: клиент банка
  class BankClient extends Person {
    constructor(surname, name, patronymic, accountNumber, depositAmount) {
      super(surname, name, patronymic); // Вызов конструктора родителя
      this.accountNumber = accountNumber;
      this.depositAmount = depositAmount;
    }

    getAccountInfo() {
      return `Счет №${this.accountNumber}, сумма: ${this.depositAmount} руб.`;
    }

    toHTML() {
      return `<p>${this.getFullName()} — ${this.getAccountInfo()}</p>`;
    }
  }

  // Работа с клиентами
  const clients = [];

  function validateForm(form) {
    const surname = form.surname.value.trim();
    const name = form.name.value.trim();
    const patronymic = form.patronymic.value.trim();
    const accountNumber = form.accountNumber.value.trim();
    const depositAmount = form.depositAmount.value.trim();
  
    // Проверка: имя, фамилия, отчество не содержат цифр
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/; // Только буквы
    if (!nameRegex.test(surname) || !nameRegex.test(name) || !nameRegex.test(patronymic)) {
      alert("Фамилия, имя и отчество должны содержать только буквы.");
      return false;
    }
  
    // Проверка: номер счета содержит буквы и цифры
    const accountNumberRegex = /^[A-Za-z0-9]+$/; // Только буквы и цифры
    if (!accountNumberRegex.test(accountNumber)) {
      alert("Номер счета должен содержать только латинские буквы и цифры.");
      return false;
    }
  
    // Проверка: сумма вклада — целое положительное число
    const depositAmountRegex = /^[1-9]\d*$/; // Только положительные целые числа
    if (!depositAmountRegex.test(depositAmount)) {
      alert("Сумма вклада должна быть положительным целым числом.");
      return false;
    }
  
    return true;
  }

  function addClient(form) {
    if (!validateForm(form)) {
        return;
    }
    const surname = form.surname.value;
    const name = form.name.value;
    const patronymic = form.patronymic.value;
    const accountNumber = form.accountNumber.value;
    const depositAmount = parseFloat(form.depositAmount.value);

    const client = new BankClient(surname, name, patronymic, accountNumber, depositAmount);
    clients.push(client);

    displayClients();
    form.reset();
  }

  function displayClients() {
    const clientsList = document.getElementById('clients-list');
    clientsList.innerHTML = clients.map(client => client.toHTML()).join('');
  }

  function calculateResults() {
    const results = document.getElementById('results');
    const multiAccountClients = clients.reduce((acc, client) => {
      const key = client.getFullName();
      acc[key] = acc[key] || { total: 0, count: 0 };
      acc[key].total += client.depositAmount;
      acc[key].count += 1;
      return acc;
    }, {});

    const filteredClients = Object.entries(multiAccountClients)
      .filter(([_, data]) => data.count > 1)
      .map(([name, data]) => `${name}: ${data.total} руб.`);

    results.innerHTML = filteredClients.length
      ? filteredClients.join('<br>')
      : 'Нет клиентов с несколькими счетами.';
  }

  // Добавление обработчиков событий
  document.getElementById('client-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addClient(e.target);
    calculateResults();
  });