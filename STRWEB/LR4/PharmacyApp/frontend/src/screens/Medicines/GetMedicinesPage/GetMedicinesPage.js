import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import './GetMedicinesPage.css'; // Подключаем стили
import medicineService from '../../../services/MedicineService';

const GetMedicinesPage = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedMedicines, setSortedMedicines] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    setIsAuthenticated(!!token);
  }, []);

  // Получение списка лекарств с бэкенда
  useEffect(() => {
    medicineService.getAll()
      .then(response => {
        setMedicines(response.data);
        setSortedMedicines(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке лекарств:', error);
      });
  }, []);

  const handleSort = () => {
    const sorted = [...medicines].sort((a, b) => a.title.localeCompare(b.title));
    setSortedMedicines(sorted);
  };

  // Фильтрация лекарств по поисковому запросу
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredMedicines = medicines.filter(medicine =>
      medicine.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSortedMedicines(filteredMedicines);
  };

  const handleCreateMedicine = () => {
    navigate('/create-medicine');
  };

  const handleMedicineClick = (id) => {
    navigate(`/medicine/${id}`);
  };

  return (
    <div className="medicines-page">
      <h1>Каталог лекарств</h1>
      {isAuthenticated && (
        <button onClick={handleCreateMedicine} className="create-medicine-button">
          Создать лекарство
        </button>
      )}

      <div className="search-sort-container">
        {/* Поиск */}
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />

        {/* Кнопка сортировки */}
        <button onClick={handleSort} className="sort-button">
          Сортировать по алфавиту
        </button>
      </div>

      <div className="medicines-grid">
        {sortedMedicines.map((medicine) => (
          <div
            key={medicine._id}
            className="medicine-card"
            onClick={() => handleMedicineClick(medicine._id)}
          >
            <h3>{medicine.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMedicinesPage;
