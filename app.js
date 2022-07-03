const express = require("express");
const mongoose = require("mongoose");

const homeRouter = require('./routes/homepage');



const dashboardRouter = require("./routes/dashboard");

const userRouter = require('./routes/user');

const app = express();

const cookieParser = require('cookie-parser');

mongoose.connect(process.env.DATABASE_URL)

app.use(cookieParser());
app.use(express.urlencoded({extended: true}))


app.use('/', homeRouter)
app.use('/dashboard', dashboardRouter);
app.use('/', userRouter);


module.exports = app;