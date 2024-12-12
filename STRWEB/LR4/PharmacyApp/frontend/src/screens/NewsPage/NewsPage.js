import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsPage.css'; // Подключаем стили
import MainScreen from '../../components/MainScreen/MainScreen';

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-page">
      <h2>Новости</h2>
      <div className="news-card-container">
        {news.length === 0 ? (
          <p>Нет новостей.</p>
        ) : (
          news.map((item) => (
            <div key={item._id} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p className="date">
                <strong>Дата:</strong> {new Date(item.date).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsList;
