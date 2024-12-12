const News = require('../models/newsModel');

// Создание новости
const createNews = async (req, res) => {
  const { title, content,timezone } = req.body;

  try {
    const newNews = new News({
      title,
      content,
      timezone
    });

    await newNews.save();
    res.status(201).json(newNews); // Возвращаем созданную новость
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании новости', error: error.message });
  }
};


// Получение всех новостей
const getAllNews = async (req, res) => {
    try {
      const news = await News.find(); // Получаем все новости
      res.status(200).json(news); // Отправляем список новостей
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении новостей', error: error.message });
    }
  };
  

module.exports = {createNews,getAllNews};
