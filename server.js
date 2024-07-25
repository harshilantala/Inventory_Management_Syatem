const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./db/db.js');

const User =  require('./db/model.js')
const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
