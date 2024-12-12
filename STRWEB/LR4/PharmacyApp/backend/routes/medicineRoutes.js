const express=require("express");


const {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
  } = require('../controllers/medicineController');

const router=express.Router();


router.get('/', getMedicines); // Получение всех лекарств
router.get('/:id', getMedicineById); // Получение лекарства по ID
router.post('/create', createMedicine); // Создание лекарства   upload.single('image')
router.put('/:id', updateMedicine); // Обновление лекарства
router.delete('/:id', deleteMedicine); // Удаление лекарства

module.exports = router;