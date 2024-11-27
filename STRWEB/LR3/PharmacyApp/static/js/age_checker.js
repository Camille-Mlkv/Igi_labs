document.getElementById('checkAgeButton').addEventListener('click', function() {
    const birthdateInput = document.getElementById('birthdate').value;
    const resultElement = document.getElementById('result');

    if (!birthdateInput) {
        alert('Please enter a valid date!');
        return;
    }

    const birthdate = new Date(birthdateInput);
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    // Get day of the week
    const dayOfWeek = birthdate.toLocaleDateString('ru-RU', { weekday: 'long' });

    // Check age and display result
    if (age >= 18) {
        resultElement.textContent = `Вам ${age} лет. День рождения - ${dayOfWeek}.`;
    } else {
        alert('Хмм, вам меньше 18. Идите спросите разрешения у родителей.');
    }
});