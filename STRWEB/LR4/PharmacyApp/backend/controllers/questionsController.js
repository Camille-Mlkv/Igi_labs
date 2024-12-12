const Question = require('../models/questionModel'); // Импортируем модель Question

// Получение всех вопросов
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); // Получаем все вопросы из базы данных
    res.status(200).json(questions); // Отправляем ответ с данными
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении вопросов' });
  }
};

// Создание нового вопроса
const createQuestion = async (req, res) => {
  const { question, answer,timezone } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: 'Пожалуйста, укажите вопрос и ответ' });
  }

  try {
    const newQuestion = new Question({
      question,
      answer,
      timezone
    });

    const savedQuestion = await newQuestion.save(); // Сохраняем новый вопрос
    res.status(201).json(savedQuestion); // Отправляем сохраненный вопрос в ответ
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании вопроса' });
  }
};

module.exports = {
  getQuestions,
  createQuestion,
};
