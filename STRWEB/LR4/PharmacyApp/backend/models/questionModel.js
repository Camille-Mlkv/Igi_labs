const mongoose = require('mongoose');

// Создаем схему для вопросов
const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    answer: {
      type: String,
      required: true, // Поле обязательно для заполнения
    },
    createdAt: {
      type: Date,
      default: Date.now, // Дата создания будет установлена автоматически
    },
    timezone: {  
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Для автоматического создания полей createdAt и updatedAt
  }
);

// Создаем модель
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
