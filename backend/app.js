require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');  
const passport = require('passport');
const session = require('express-session');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieSession = require("cookie-session");
const authRoute = require("./routes/auth");
const cors = require('cors');
require('./config/passport');
const app = express();

connectDB();  


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);


app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: "GET,POST,PUT,DELETE", 
  credentials: true,}
));



app.use(
  session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoute);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);





app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


const PORT = process.env.PORT || 8080;
console.log(process.env.CLIENT_ID)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
