import React, { useState } from 'react';
import axios from 'axios';
import './AgePage.css';

const AgePage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Очищаем ошибку при новой попытке

    if (!name) {
      setError('Пожалуйста, введите имя');
      return;
    }

    try {
      const response = await axios.get(`https://api.agify.io?name=${name}`);
      setAge(response.data.age); // Сохраняем возраст из ответа
    } catch (error) {
      setError('Ошибка при получении данных');
    }
  };

  return (
    <div className="age-prediction-page">
      <h1>Предсказание возраста по имени</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Введите ваше имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            required
          />
        </div>
        <button type="submit">Узнать возраст</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {age && !error && (
        <p>Предсказанный возраст для имени "{name}": {age} лет</p>
      )}
    </div>
  );
};

export default AgePage;
