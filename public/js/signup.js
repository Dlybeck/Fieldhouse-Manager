import sha256 from 'crypto-js/sha256';


document.getElementById('signupform').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const fname = document.getElementById('firstname').value.trim();
    const lname = document.getElementById('lastname').value.trim(); 
    const email = document.getElementById('email').value.trim(); 
    const password = document.getElementById('password').value.trim(); 
    const confirm_password = document.getElementById('confirm_password').value.trim(); 

    if (!fnameElement || !lnameElement || !emailElement || !passwordElement || !confirmPasswordElement) {
        console.error('One or more form elements are missing!');
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
        email, 
        hashedPassword, 
    });

    // Create an object to store the form data for submission
    const formData = {
        fname, 
        lname, 
        email, 
        hashedPassword, 
    };

    // Send the form data to the server using Fetch API
    fetch('', { // SET ENDPOINT
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert form data object to JSON string
    })
        .then(response => response.json()) 
        .then(data => console.log('Success:', data)) 
        .catch(error => console.error('Error:', error)); 
});
