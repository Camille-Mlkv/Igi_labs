import React, { useState } from 'react';
import './CreateMedicinePage.css'; // Подключаем стили
//import axios from 'axios';
import { useTimezone } from "../../../components/TimezoneContext";
//import { useNavigate } from "react-router-dom";
import medicineService from '../../../services/MedicineService';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const CreateMedicinePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  //const navigate = useNavigate();
  const timezone = useTimezone();

  const handlePriceChange = (e) => {
    const value = e.target.value;
    
    // Проверка, что значение больше 0
    if (value && parseFloat(value) <= 0) {
      setError('Цена должна быть больше 0');
    } else {
      setError('');  // Очищаем ошибку, если значение корректное
    }
    
    setPrice(value); // Обновляем цену
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      instruction,
      price,
      timezone, 
    };

    try {
        // const response = await axios.post('/api/medicines/create', formData, {headers: {
        //   "Content-type":"application/json"
        // }});
        const response = await medicineService.create(formData); 
        setMessage(`Лекарство "${response.data.title}" успешно создано!`);

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="create-medicine-page">
      <h1>Создать новое лекарство</h1>
      {message && <p>{message}</p>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Инструкция:</label>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Цена:</label>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateMedicinePage;
