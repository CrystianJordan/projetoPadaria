const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//carregar env
dotenv.config({
    path: './config/config.env'
});


const products = require('./routes/products');




//connect to database
connectDB();




const app = express();

//Body parser
app.use(express.json());





app.use('/api/v1/products', products);

//Set error handlers
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Servidor rodando na porta ${PORT}`.yellow.bold)
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
});