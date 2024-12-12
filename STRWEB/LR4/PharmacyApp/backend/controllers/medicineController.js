const Medicine=require("../models/medicineModel");
const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const getMedicines=asyncHandler(async (req,res)=>{
    try {
        const medicines = await Medicine.find({});
        res.json(medicines);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

// Получить лекарство по ID
const getMedicineById = async (req, res) => {
    try {
      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
      res.json(medicine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Создать новое лекарство
  // const createMedicine = async (req, res) => {
  //   try {
  //     const { title, description, instruction, price,timezone } = req.body;

  //     const medicine = new Medicine({ title, description, instruction, price,timezone });
  //     const createdMedicine = await medicine.save();
  //     console.log('created');
  //     res.status(201).json(createdMedicine);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // };
  const createMedicine = async (req, res) => {
    try {
      // Извлекаем токен из заголовков запроса
      const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовка Authorization
      if (!token) {
        console.log('token is not provided');
        return res.status(401).json({ message: 'Токен не предоставлен' }); // Если токен не предоставлен
      }
  
      // Проверяем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Верификация токена с вашим секретом
      if (!decoded) {
        console.log('token is not valid');
        return res.status(401).json({ message: 'Неавторизованный доступ' }); // Если токен невалидный
      }
  
      const { title, description, instruction, price, timezone } = req.body;
  
      // Создаем новое лекарство
      const medicine = new Medicine({
        title,
        description,
        instruction,
        price,
        timezone,
      });
  
      // Сохраняем лекарство в базе данных
      const createdMedicine = await medicine.save();
      console.log('created');
      res.status(201).json(createdMedicine); // Отправляем успешный ответ
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message }); // В случае ошибки отправляем сообщение об ошибке
    }
  };
  
  // Обновить лекарство
  const updateMedicine = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовка Authorization
      if (!token) {
        console.log('token is not provided');
        return res.status(401).json({ message: 'Токен не предоставлен' }); // Если токен не предоставлен
      }
  
      // Проверяем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Верификация токена с вашим секретом
      if (!decoded) {
        console.log('token is not valid');
        return res.status(401).json({ message: 'Неавторизованный доступ' }); // Если токен невалидный
      }

      const { title, description, instruction, price } = req.body;

      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
  
      medicine.title = title;
      medicine.description = description;
      medicine.instruction = instruction;
      medicine.price = price;
  
      const updatedMedicine = await medicine.save();
      res.json(updatedMedicine);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Удалить лекарство
  const deleteMedicine = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Извлекаем токен из заголовка Authorization
      if (!token) {
        console.log('token is not provided');
        return res.status(401).json({ message: 'Токен не предоставлен' }); // Если токен не предоставлен
      }
  
      // Проверяем токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Верификация токена с вашим секретом
      if (!decoded) {
        console.log('token is not valid');
        return res.status(401).json({ message: 'Неавторизованный доступ' }); // Если токен невалидный
      }
      
      const medicine = await Medicine.findById(req.params.id);
      console.log('here');
      if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
  
      await Medicine.findByIdAndDelete(req.params.id);
      res.json({ message: 'Medicine removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
  };