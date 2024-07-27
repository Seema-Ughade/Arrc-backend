const express = require('express');
const { dbConnect } = require('../config/dbConnection');
const router = require('../routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || 'localhost';

const app = express();

dbConnect();

app.use(express.json());
app.use('/api/v1', router);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
