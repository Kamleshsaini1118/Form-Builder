const express = require("express");
const mongoose = require("mongoose");
const formRoute = require("./routes/formRoute")
const responseRoute = require("./routes/responseRoute")
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors()); 
app.use(express.json());

// connect to mongoDB
mongoose.connect('mongodb+srv://form:QhEkNLCkewZ1lK0Z@cluster1.b2ik1.mongodb.net/form')
.then(() => {
    console.log('Connected to DB');
}).catch(err => console.error("MongoDB connection error:", err));

// models
const form = require("./models/formModel");
const response = require("./models/responseModel");

// routes
app.use("/api/forms", formRoute); // yeh form-route
app.use("/api/response", responseRoute); // yeh response-route

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
