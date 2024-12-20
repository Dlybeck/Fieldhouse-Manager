import mongoose from 'mongoose';
import User from './models/User.js';
import Location from './models/Location.js';
import Reservation from './models/Reservation.js';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use('/public', express.static('public'));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Serve home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public/home.html'));
});

// Serve user.html
app.get('/add-user', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public/user.html'));
});

mongoose.connect("mongodb+srv://dlybeck383:M0ng0PassW0rd@testcluster.gkev5.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster");

// Get entire database
app.get('/database', async (req, res) => {
    try {
        const users = await User.find();
        const locations = await Location.find();
        const reservations = await Reservation.find();
        res.json({ users, locations, reservations });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get reservations by user ID
app.get('/reservationByUserID', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.query.userId }).populate('reservations');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const reservations = await Reservation.find({ _id: { $in: user.reservations } })
            .populate('user')
            .populate('location');

        res.json(reservations);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get locations
app.get('/locations', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get reservations
app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get all reservations populated
app.get('/reservations2', async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('user')
            .populate('location');

        res.json(reservations);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

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
    const { user, location, date, startTime, endTime } = req.body;
    if (!user || !location || !date || !startTime || !endTime) {
        console.log('All fields are required: user, location, startTime, endTime');
    }

    try {
        const reservation = new Reservation({ user, location, date, startTime, endTime });
        await reservation.save();
        const newUser = await User.findOne({_id: user});
        newUser.reservations.push(reservation._id);
        newUser.save();
        res.status(201).send(reservation);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Delete user by fname and lname
app.delete('/user', async (req, res) => {
    const { fname, lname } = req.body;

    try {
        // Find the user by fname and lname and delete
        const user = await User.findOneAndDelete({ fname, lname });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Delete the user's reservations
        await Reservation.deleteMany({ user: user._id });

        res.status(200).send('User and their reservations deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});