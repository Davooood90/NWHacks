import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {connectDB} from './config/db.js'; 

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

const UserSchema = new mongoose.Schema(
    {
      name: { type: String, required: true }, // User's name
      email: { type: String, required: true, unique: true }, // User's email
      courseList: [
        {
          name: { type: String, required: true }, // Course name
          section: { type: String, required: true }, // Course section
          credits: { type: String, required: true }, // Number of credits
          grading: { type: String, required: true }, // Grading type (e.g., "Graded")
          term: { type: Number, required: true }, // Term (e.g., 1, 2)
          format: { type: String, required: true }, // Format (e.g., "Lecture")
          mode: { type: String, required: true }, // Mode (e.g., "Online Learning")
          instructor: { type: String, required: false }, // Instructor's name
          meeting: { type: String, required: false }, // Meeting details (optional)
          status: { type: String, required: true }, // Status (e.g., "Registered")
          start: { type: String, required: true }, // Start date
          end: { type: String, required: true }, // En  d date
        },
      ],
    },
    {
      timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);
const DataModel = mongoose.model('Data', UserSchema);

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