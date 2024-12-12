const express = require('express');
const router = express.Router();
const {createQuestion, getQuestions}=require("../controllers/questionsController");

router.route('/create').post(createQuestion);
router.route('/').get(getQuestions);

module.exports = router;
