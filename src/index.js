const express = require('express');
const { dbConnect } = require('../config/dbConnection');
const router = require('../routes/userRoutes');
const internshipRoutes = require('../routes/internshipRoutes');
const contactRoutes = require('../routes/contactRoutes');
const courseRoutes = require('../routes/courseRoutes');

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || '0.0.0.0';

const app = express();

dbConnect();

// Enable CORS for all routes

app.use(cors());

app.use(express.json());
app.use('/api/v1', router);
app.use('/api/v1/internships', internshipRoutes);
app.use('/api/v1/', contactRoutes);
app.use('/api/v1/courses', courseRoutes);



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
