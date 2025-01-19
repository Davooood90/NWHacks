import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js"; 
import cors from "cors";    

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
}));

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define Mongoose Schema and Model
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        id: { type: String, required: true },
        faculty: { type: String, required: true },
        start_date: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        courseList: [
            {
                name: { type: String, required: true },
                section: { type: String, required: true },
                credits: { type: String, required: true },
                grading: { type: String, required: true },
                term: { type: Number, required: true },
                format: { type: String, required: true },
                mode: { type: String, required: true },
                instructor: { type: String, required: false },
                meeting: { type: String, required: false },
                status: { type: String, required: true },
                start: { type: String, required: true },
                end: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const DataModel = mongoose.model("Data", UserSchema);

// Routes
app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.get("/search", async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { email: email } : {}; 
    const result = await DataModel.find(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/save-json", async (req, res) => {
    try {
        const jsonData = req.body; // Access JSON data from the request body
        const savedData = await DataModel.create(jsonData); // Save to MongoDB
        res.status(200).json({ message: "Data saved successfully", savedData });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "Failed to save data" });
    }
});

app.put("/update", async (req, res) => {
  try {
    const { email, updates } = req.body;

    if (!email || !updates) {
      return res.status(400).json({ error: "Email and updates are required" });
    }

    const updatedData = await DataModel.findOneAndUpdate(
      { email },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedData });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Failed to update data" });
  }
});

// Delete a user by email
app.delete("/delete", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const deletedData = await DataModel.findOneAndDelete({ email });

    if (!deletedData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedData });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ error: "Failed to delete data" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
