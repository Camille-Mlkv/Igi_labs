import React, { useState } from 'react';
import axios from 'axios';
import './CountryPage.css';

const CountryPage = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(null);
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
      const response = await axios.get(`https://api.nationalize.io?name=${name}`);
      if (response.data.country && response.data.country.length > 0) {
        setCountry(response.data.country[0].country_id); // Сохраняем страну из ответа
      } else {
        setError('Не удалось предсказать страну для этого имени');
      }
    } catch (error) {
      setError('Ошибка при получении данных');
    }
  };

  return (
    <div className="country-prediction-page">
      <h1>Предсказание страны по имени</h1>
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
        <button type="submit">Узнать страну</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {country && !error && (
        <p>Предсказанная страна для имени "{name}": {country}</p>
      )}
    </div>
  );
};

export default CountryPage;
