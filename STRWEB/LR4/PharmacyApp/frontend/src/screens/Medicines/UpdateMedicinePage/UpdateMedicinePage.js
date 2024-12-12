import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import medicineService from '../../../services/MedicineService';
import './UpdateMedicinePage.css'; // Подключаем стили
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const UpdateMedicinePage = () => {
  const [medicine, setMedicine] = useState({
    title: '',
    description: '',
    instruction: '',
    price: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams(); // Получаем id лекарства из URL
  const navigate = useNavigate();

  // Загружаем данные лекарства по id
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await medicineService.get(id);
        setMedicine(response.data); // Заполняем поля формы
      } catch (error) {
        console.error('Ошибка при загрузке лекарства:', error);
        setMessage('Ошибка при загрузке данных лекарства');
      }
    };

    fetchMedicine();
  }, [id]);

  // Обработчик изменения цены
  const handlePriceChange = (e) => {
    const value = e.target.value;
    
    // Проверка, что цена больше 0
    if (value && parseFloat(value) <= 0) {
      setError('Цена должна быть больше 0');
    } else {
      setError(''); // Очищаем ошибку, если значение корректное
    }
    
    setMedicine({ ...medicine, price: value }); // Обновляем цену
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await medicineService.update(id,medicine);
      setMessage(`Лекарство "${response.data.title}" успешно обновлено!`);
      navigate(`/medicine/${id}`); // Перенаправляем на страницу с подробной информацией
    } catch (error) {
      setMessage('Ошибка при обновлении лекарства');
      console.error(error);
    }
  };

  return (
    <div className="update-medicine-page">
      <h1>Обновить лекарство</h1>
      {message && <p>{message}</p>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название:</label>
          <input
            type="text"
            value={medicine.title}
            onChange={(e) => setMedicine({ ...medicine, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Описание:</label>
          <textarea
            value={medicine.description}
            onChange={(e) => setMedicine({ ...medicine, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Инструкция:</label>
          <textarea
            value={medicine.instruction}
            onChange={(e) => setMedicine({ ...medicine, instruction: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Цена:</label>
          <input
            type="number"
            value={medicine.price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateMedicinePage;
