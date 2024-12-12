import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import axios from 'axios';
import './MedicineInfoPage.css';
import medicineService from '../../../services/MedicineService';

const MedicineInfoPage = () => {
    const { id } = useParams(); // Получение ID лекарства из URL
    const navigate = useNavigate();
    const [medicine, setMedicine] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
      setIsAuthenticated(!!token);
    }, []);
  
    // Получение информации о лекарстве
    useEffect(() => {
      const fetchMedicine = async () => {
        try {
          //const response = await axios.get(`/api/medicines/${id}`);
          const response=await medicineService.get(id);
          setMedicine(response.data); // Ожидаем объект с данными о лекарстве
        } catch (error) {
          console.error('Ошибка при загрузке лекарства:', error);
          navigate('/'); // Возвращаем на главную, если ошибка
        }
      };
  
      fetchMedicine();
    }, [id, navigate]);
  
    if (!medicine) {
      return <p>Загрузка информации...</p>;
    }

    const handleUpdateClick = () => {
      navigate(`/update-medicine/${medicine._id}`);
    };
    const handleDeleteClick = async () => {
      const confirmDelete = window.confirm('Вы уверены, что хотите удалить это лекарство?');

      if (confirmDelete) {
        try {
          const response=await medicineService.delete(medicine._id);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        alert('Лекарство удалено!');
        navigate('/medicines');
      }
    };

  
    return (
      <div className="medicine-details">
        <h1>{medicine.title}</h1>
        <p><strong>Описание:</strong> {medicine.description}</p>
        <p><strong>Инструкция:</strong> {medicine.instruction}</p>
        <p><strong>Цена:</strong> {medicine.price} руб.</p>
        <button onClick={() => navigate('/medicines')} className="back-button">Назад</button>
        {isAuthenticated && (
            <div className="buttons">
              <button onClick={handleUpdateClick} className="update-button">Обновить</button>
              <button onClick={handleDeleteClick} className="delete-button">Удалить</button>
            </div>
          )}
      </div>
    );
}

export default MedicineInfoPage