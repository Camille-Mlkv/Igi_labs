import React from 'react';
import { Navigate } from 'react-router-dom';

// Компонент для защиты маршрутов
const PrivateRoute = ({ element }) => {
  const userInfo = localStorage.getItem('userInfo');
  
  // Проверяем, авторизован ли пользователь
  if (!userInfo) {
    // Если не авторизован, перенаправляем на страницу входа
    return <Navigate to="/login" />;
  }
  
  // Если пользователь авторизован, показываем переданный компонент
  return element;
};

export default PrivateRoute;
