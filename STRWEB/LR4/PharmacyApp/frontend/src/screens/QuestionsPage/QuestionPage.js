import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionsPage.css'; // Подключаем стили

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions');
        setQuestions(response.data); // Сохраняем полученные данные
      } catch (error) {
        console.error('Ошибка при загрузке вопросов:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="question-list">
      <h1>Список вопросов</h1>
      <ul>
        {questions.map((question) => (
          <li key={question._id} className="question-item">
            <details className="question-details">
              <summary className="question-summary">{question.question}</summary>
              <div className="answer-container">
                <p>{question.answer}</p>
                <p><strong>Дата создания:</strong> {new Date(question.createdAt).toLocaleString()}</p>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
