const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('../routes/authentication/authRoutes');
// const taskRoutes = require('../routes/requesters/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
