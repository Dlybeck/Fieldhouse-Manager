import sha256 from 'crypto-js/sha256';
import User from '../../models/User';


document.getElementById('signupform').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const fname = document.getElementById('firstname').value.trim();
    const lname = document.getElementById('lastname').value.trim(); 
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim(); 
    const confirm_password = document.getElementById('confirm_password').value.trim(); 

    if (!fnameElement || !lnameElement || !usernameElement || !passwordElement || !confirmPasswordElement) {
        console.error('One or more form elements are missing!');
        return;
    }
    
    const blog = await  User.exists({username: username})
    if(blog != null){
        console.error('That username is already taken');
        return;
    }

    // Check if passwords match
    if (password !== confirm_password) {
        alert('Passwords do not match. Please try again.'); 
        return; 
    }

    // Hashing the password for security
    const hashedPassword = sha256(password).toString(); 

    // Log the collected form data (excluding the raw password) for debugging purposes
    console.log('Form data:', {
        fname, 
        lname, 
        hashedPassword, 
    });

    // Create an object to store the form data for submission
    const formData = {
        fname, 
        lname, 
        hashedPassword, 
    };

    // create new blog post and insert into database
    const user = await User.create({
        fname: fname,
        lname: lname,
        username: username,
        password: hashedPassword
    });

    
});
