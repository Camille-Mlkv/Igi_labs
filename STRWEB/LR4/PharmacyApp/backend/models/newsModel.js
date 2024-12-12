const mongoose = require('mongoose');

// Модель новости
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    timezone: {  
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // автоматически добавит createdAt и updatedAt
  }
);

const News = mongoose.model('News', newsSchema);

module.exports = News;
