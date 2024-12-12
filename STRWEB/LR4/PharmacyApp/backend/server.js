const express=require("express");
const dotenv=require('dotenv');
const connectDb=require('./config/db');
const userRoutes=require('./routes/userRoutes');
const medicineRoutes=require('./routes/medicineRoutes');
const newsRoutes=require('./routes/newsRoutes');
const questionsRoutes=require('./routes/questionsRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const cors = require('cors');
//const passport = require('passport');
//require('./passport.config')(passport);

const app=express();

app.use(
  cors({
    origin: 'http://localhost:3000', // Укажите ваш фронтенд URL
    credentials: true, // Чтобы cookie передавались между клиентом и сервером
  })
);
// const corsOptions = {
//   origin: "http://localhost:3000", // Замените на URL фронтенда
//   credentials: true,               // Позволяем отправлять cookies
// };

const User=require("./models/userModel");
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const client = new OAuth2Client();
const JWT_SECRET = process.env.JWT_SECRET;

//app.use(cors()); //corsOptions

dotenv.config();
connectDb();
app.use(express.json());

//app.use(passport.initialize());

app.get("/", (req, res) => {
    res.send("API is running..");
  });

app.get("/api/catalog",(req,res)=>{
  res.json({ "id": 1 });
});

app.use("/api/users",userRoutes);
app.use("/api/medicines",medicineRoutes);
app.use("/api/news",newsRoutes);
app.use("/api/questions",questionsRoutes);
app.use(notFound);
app.use(errorHandler);
//require("./routes/googleRoutes")(app);

app.post('/google-auth', async (req, res) => {
  const { credential, client_id } = req.body;

  try {
    // Verify the ID token with Google's API
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;

    // Check if the user already exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if they don't exist
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: 'google',
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h', // Adjust expiration time as needed
    });

    // Send the token as a cookie and response
    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: false, // Set to true in production when using HTTPS
        maxAge: 3600000, // 1 hour in milliseconds
      })
      .json({ message: 'Authentication successful', user });
  } catch (err) {
    console.error('Error during Google Authentication:', err);
    res.status(400).json({ error: 'Authentication failed', details: err });
  }
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));