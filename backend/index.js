const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();


//Student Routing
const studentRoute = require('./Routes/StudentRouts')
const AuthRouter = require('./Routes/AuthRouter');
const StudentLogin = require('./Routes/StudentLoginRoute');
const EventRouter = require("./Routes/EventRouter");
const NoticeRouter = require("./Routes/NoticeRouter");
const FeedbackRouter = require("./Routes/FeedbackRouter");
const EventModel = require("./Models/Event");
const NoticeModel = require("./Models/Notice");

app.use(express.json()); // Ensure JSON parsing middleware is added
app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/student',studentRoute)
app.use('/user',StudentLogin);
app.use("/event", EventRouter);
app.use("/notice", NoticeRouter);
app.use("/feedback",FeedbackRouter);

const db=require('./Models/db');
db();

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
})
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})


app.get("/event", async (req, res) => {
    try {
      const events = await EventModel.find(); // Fetch events from MongoDB
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/notice", async (req, res) => {
    try {
      const notices = await NoticeModel.find(); // Fetch events from MongoDB
      res.json(notices);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



