const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors({
    origin: '*'
  }));


// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/business', require('./routes/business'));
app.use('/api/table',require('./routes/table'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
