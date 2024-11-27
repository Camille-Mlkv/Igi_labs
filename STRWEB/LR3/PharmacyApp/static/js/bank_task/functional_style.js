// Базовый класс для клиента
function Person(surname, name, patronymic) {
  this._surname = surname; //when it's in this, child has access to it
  this._name = name;
  this._patronymic = patronymic;
}

// Геттеры и сеттеры для фамилии, имени и отчества
Person.prototype.getSurname = function() {
  return this._surname;
};

Person.prototype.setSurname = function(surname) {
  if (typeof surname === 'string' && surname.trim() !== '') {
    this._surname = surname;
  } else {
    throw new Error('Фамилия должна быть строкой.');
  }
};

Person.prototype.getName = function() {
  return this._name;
};

Person.prototype.setName = function(name) {
  if (typeof name === 'string' && name.trim() !== '') {
    this._name = name;
  } else {
    throw new Error('Имя должно быть строкой.');
  }
};

Person.prototype.getPatronymic = function() {
  return this._patronymic;
};

Person.prototype.setPatronymic = function(patronymic) {
  if (typeof patronymic === 'string' && patronymic.trim() !== '') {
    this._patronymic = patronymic;
  } else {
    throw new Error('Отчество должно быть строкой.');
  }
};

// Метод для получения полного имени
Person.prototype.getFullName = function() {
  return `${this._surname} ${this._name} ${this._patronymic}`;
};

// Метод для вывода данных о клиенте
Person.prototype.toHTML = function() {
  return `<p>${this.getFullName()}</p>`;
};

// Наследник: клиент банка с дополнительными параметрами
function BankClient(surname, name, patronymic, accountNumber, depositAmount) {
  Person.call(this, surname, name, patronymic); // Наследуем свойства от Person
  this._accountNumber = accountNumber;
  this._depositAmount = depositAmount;
}

// Наследование методов
BankClient.prototype = Object.create(Person.prototype);
BankClient.prototype.constructor = BankClient;

// Геттеры и сеттеры для аккаунта и суммы депозита
BankClient.prototype.getAccountNumber = function() {
  return this._accountNumber;
};

BankClient.prototype.setAccountNumber = function(accountNumber) {
  if (typeof accountNumber === 'string' && accountNumber.trim() !== '') {
    this._accountNumber = accountNumber;
  } else {
    throw new Error('Номер счета должен быть строкой.');
  }
};

BankClient.prototype.getDepositAmount = function() {
  return this._depositAmount;
};

BankClient.prototype.setDepositAmount = function(amount) {
  if (Number.isFinite(amount) && amount > 0) {
    this._depositAmount = amount;
  } else {
    throw new Error('Сумма депозита должна быть положительным числом.');
  }
};

// Метод для получения информации о счете
BankClient.prototype.getAccountInfo = function() {
  return `Счет №${this._accountNumber}, сумма: ${this._depositAmount} руб.`;
};

// Переопределенный метод toHTML с учетом информации о счете
BankClient.prototype.toHTML = function() {
  return `<p>${this.getFullName()} — ${this.getAccountInfo()}</p>`;
};

// Класс для управления клиентами
function ClientManager() {
  this.clients = [];
  
  // Метод для добавления клиента
  this.addClient = function(client) {
    if (client instanceof BankClient) {
      this.clients.push(client);
    } else {
      throw new Error('Невалидный клиент');
    }
  };

  // Метод для отображения всех клиентов
  this.displayClients = function() {
    const clientsList = document.getElementById('clients-list');
    clientsList.innerHTML = this.clients.map(client => client.toHTML()).join('');
  };

  // Метод для расчета суммы вкладов для клиентов с несколькими счетами
  this.calculateResults = function() {
    const results = document.getElementById('results');
    const multiAccountClients = this.clients.reduce((acc, client) => {
      const key = client.getFullName();
      acc[key] = acc[key] || { total: 0, count: 0 };
      acc[key].total += client.getDepositAmount();
      acc[key].count += 1;
      return acc;
    }, {});

    const filteredClients = Object.entries(multiAccountClients)
      .filter(([_, data]) => data.count > 1)
      .map(([name, data]) => `${name}: ${data.total} руб.`);

    results.innerHTML = filteredClients.length
      ? filteredClients.join('<br>')
      : 'Нет клиентов с несколькими счетами.';
  };

  // Валидация формы
  this.validateForm = function(form) {
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
  };
}

// Создаем менеджера клиентов
const clientManager = new ClientManager();

// Добавление обработчиков событий
document.getElementById('client-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  if (!clientManager.validateForm(form)) {
    return;
  }

  const surname = form.surname.value;
  const name = form.name.value;
  const patronymic = form.patronymic.value;
  const accountNumber = form.accountNumber.value;
  const depositAmount = parseFloat(form.depositAmount.value);

  const client = new BankClient(surname, name, patronymic, accountNumber, depositAmount);
  clientManager.addClient(client);

  clientManager.displayClients();
  clientManager.calculateResults();
  form.reset();
});