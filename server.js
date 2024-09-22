const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize express and dotenv
const app = express();
dotenv.config();

// Middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());          // To allow requests from your React frontend

// MongoDB connection using mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error:", error));

// Dummy Schema and Model for MongoDB (Example for Users)
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model('User', userSchema);

// API Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/users', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
