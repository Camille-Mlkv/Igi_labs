// src/MedicineService.js
import axios from 'axios';

const API_URL = "http://localhost:3000/api/medicines"; // Замените на ваш реальный URL

class MedicineService {
  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  create(data) {
    //return axios.post(`${API_URL}/create`, data);
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    return axios.post(`${API_URL}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data) {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    return axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(id) {
    const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    return axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

}

// Создаем экземпляр класса и экспортируем его
const medicineServiceInstance = new MedicineService();
export default medicineServiceInstance;
