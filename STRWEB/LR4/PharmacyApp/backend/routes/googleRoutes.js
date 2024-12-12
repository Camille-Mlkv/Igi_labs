const express = require('express');
const passport = require('passport');

module.exports = (app) => {
    const router = express.Router();

    // Маршрут для начала аутентификации Google
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // Callback маршрут для завершения аутентификации Google
    router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }), (req, res) => {
        // Переадресация в React-приложение после успешной аутентификации
        res.redirect(`http://localhost:3000`);
    });

    app.use('/api/auth/oauth', router);
};