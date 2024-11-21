import sha256 from 'crypto-js/sha256';

document.getElementById('signinform').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const hashPass = sha256(password).toString();

    const data = {
        username: username,
        password: hashPass
    };

    try{
        const response = await fetch('/s  igningo', {
            method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
        });

        if (response.ok){
            const result = await response.json();
            if (result.success) {
                alert("Signed in!");
                window.location.href = '/homepage';
            }
        } else{
            alert("an error occurred");
        }

    } catch (error) {
        console.error('Error:', error);
        alert("an error occurred");
    }
});