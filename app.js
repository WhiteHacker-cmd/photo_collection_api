const express = require("express");

const homeRouter = require('./routes/homepage');



const dashboardRouter = require("./routes/dashboard");

const userRouter = require('./routes/user');

const app = express();

const cookieParser = require('cookie-parser');

app.use(cookieParser());


app.use('/', homeRouter)
app.use('/dashboard', dashboardRouter);
app.use('/', userRouter);


module.exports = app;