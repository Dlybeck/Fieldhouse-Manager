import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import mongoose from 'mongoose';
import User from './models/User.js';
import Location from './models/Location.js';
import Reservation from './models/Reservation.js';
import dotenv from 'dotenv';
dotenv.config();

const server = createServer(async (req, res) => {
    const publicDir = join(process.cwd(), 'public'); // Define the public directory
    let filePath = join(publicDir, req.url);

    // Default to index.html for root requests
    if (req.url === '/' || req.url === '/signin.html') {
        filePath = join(publicDir, 'signin.html');
    }

    try {
        // Determine file type
        const ext = filePath.split('.').pop();
        const contentType = {
            html: 'text/html',
            js: 'application/javascript',
            css: 'text/css',
        }[ext] || 'text/plain';

        // Read and serve the file
        const content = await readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:3000');
});

// app.post('/signingo', (req,res) => {
// })


const uri = process.env.URI;
mongoose.connect(uri);



/**
 * EXAMPLES OF ADDING TO, QUERYING AND DELETING a DATABASE
 */

async function addData() {
    //Add User
    await User.create({
        fname: "David",
        lname: "Lybeck",
        username: "dlybeck",
        password: "password123",
    });

    // Add Location
    await Location.create({
        name: "Gym"
    });

    const user = await User.findOne({ fname: "David" });
    const location = await Location.findOne({ name: "Gym" });

    //Add Reservation
    await Reservation.create({
        user: user._id,
        location: location._id,
        startTime: new Date(2024, 10, 30, 11, 30, 0),
        endTime: new Date(2024, 10, 30, 13, 30, 0)
    });

    //Add the reservation to User and Location as well (to make it doubly linked)
    const reservation = await Reservation.findOne({ user:user });
    user.reservations.push(reservation);
    await user.save();
    location.reservations.push(reservation);
    await location.save();
}

async function viewData() {
    var articles = await User.findOne({fname:'David'});
    console.log('Current Users:', articles.username, '\n');
    articles = await Location.find({});
    console.log('Current Locations:', articles, '\n');
    articles = await Reservation.find({});
    console.log('Current Reservations:', articles);
}

async function clearData(){
    //Undo all the additions (clear the database) for the next run
    await User.deleteMany({});
    await Location.deleteMany({});
    await Reservation.deleteMany({});
}


//Add to the current database
await addData().catch(console.error);
//View the current database
await viewData().catch(console.error);
//Delete the current database
await clearData().catch(console.error);
