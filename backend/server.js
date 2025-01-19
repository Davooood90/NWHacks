import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {connectDB} from './config/db.js'; 

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model('Data', DataSchema);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.post('/save-json', async (req, res) => {
    try {
      const jsonData = req.body; // Access JSON data from the request body
      const savedData = await DataModel.create(jsonData); // Save to MongoDB
      res.status(200).json({ message: 'Data saved successfully', savedData });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    }
  });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});