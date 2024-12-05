import sha256 from 'crypto-js/sha256';
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();
document.getElementById('signinform').addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputUsername = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    const hashPass = sha256(inputPassword).toString();

   //check if the user exists, then compare passwords
   var savedUser = User.findOne({username: inputUsername});
   if(savedUser !== null){
        if(savedUser.password == hashPass){
            console.log("Success, username and password: " + inputUsername + ", " + inputPassword);
        }
        else{
            console.log("failed");
        }
   }
});