import React from 'react'
//import axios from 'axios';
import './HomePage.css';

export const HomePage = () => {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  const formattedDate = currentDate.toLocaleString('ru-RU', options);


  return (
    <div className="home-page">
      <h1>Добро пожаловать в аптеку LifeLine!</h1>
      <p>Мы заботимся о вашем здоровье и предлагаем широкий ассортимент медикаментов для любых нужд.</p>
      <p>Сегодня: {formattedDate}</p>
    </div>
  );
}
