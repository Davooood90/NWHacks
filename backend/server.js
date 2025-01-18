const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 27017;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mern-stack-db", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("Hello from backend");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});