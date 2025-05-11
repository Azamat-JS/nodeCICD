require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const express = require('express');

const app = express();

const connectDB = require('./db/connect');
const groupRouter = require('./routes/group_rt');
const studentRouter = require('./routes/student_rt');
const mainRouter = require('./routes/main_rt');
const teacherRouter = require('./routes/teacher_rt');
const paymentRouter = require('./routes/payment_rt');
const appealRouter = require('./routes/appeals_rt')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require("./utils/swagger");

// Middleware
app.use(express.json());
app.use(cors());
app.use('/crmswagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.get('/', (req, res) => {
  res.send('Welcome to DevOps world!')
})
// Routes
app.use(groupRouter);
app.use(studentRouter);
app.use(mainRouter);
app.use(teacherRouter);
app.use(paymentRouter);
app.use(appealRouter);

// Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log('server is running on ' + port));
  } catch (error) {
    console.log(error);
  }
};

start();
