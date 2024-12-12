const express = require('express');
const router = express.Router();
const {createNews, getAllNews}=require("../controllers/newsController");

router.route('/create').post(createNews);
router.route('/').get(getAllNews);

module.exports = router;
