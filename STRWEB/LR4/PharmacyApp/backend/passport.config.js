const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User=require("../backend/models/userModel");

module.exports = (passport) => {
    // Google стратегия
    passport.use(new GoogleStrategy(
        {
            clientID: '83789705811-d0ahcdb9ff8sepng7ugpqfun48chbsn0.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:5000/api/auth/oauth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Поиск пользователя по Google ID
                let user = await User.findOne({ googleId: profile.id });
                
                // Если пользователя нет, создаем его
                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    // Сериализация пользователя
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};