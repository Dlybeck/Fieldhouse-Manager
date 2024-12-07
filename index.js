import mongoose from 'mongoose';
import User from './models/User.js';
import Location from './models/Location.js';
import Reservation from './models/Reservation.js'; // Import Reservation model
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


dotenv.config();


const app = express();
app.use('/public', express.static('public'));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Serve home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public/home.html'));
});

const uri = process.env.URI;
mongoose.connect(uri);

// Get entire database
app.get('/database', async (req, res) => {
    try {
        const users = await User.find();
        const locations = await Location.find();
        res.json({ users, locations });
    } catch (err) {
        res.status(500).send(err.message);
    }
});
//get users
app.get('/users', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Clear database
app.delete('/database', async (req, res) => {
    try {
        await User.deleteMany({});
        await Location.deleteMany({});
        res.send('Database cleared');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add user
app.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Add location
app.post('/location', async (req, res) => {
    try {
        const location = new Location(req.body);
        await location.save();
        res.status(201).send(location);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Add reservation
app.post('/submit-reservation', async (req, res) => {
    const { user, location, startTime, endTime } = req.body;
    if (!user || !location || !startTime || !endTime) {
        return res.status(400).send('All fields are required: user, location, startTime, endTime');
    }

    try {
        const reservation = new Reservation({ user, location, startTime, endTime });
        await reservation.save();
        res.status(201).send(reservation);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});