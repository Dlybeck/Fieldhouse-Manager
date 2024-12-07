// js/test.js
document.addEventListener("DOMContentLoaded", () => {

    async function getUsers() { 
        try {
            const response = await fetch('/users');
            const data = await response.json();
            console.log('Users:', data); // Log the fetched users
    
            return data;  // Return the data after it has been fetched
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    
    async function displayUsers() {
        const data = await getUsers();  // Wait for getUsers to finish and return the data
    
        let text = "";
    
        for (let i = 0; i < data.length; i++) {
            text += data[i].username + " ";
            text += data[i].fname + " ";
            text += data[i].lname + "<br>";  // Use <br> to create a new line
        }
    
        let paragraph = document.getElementById("responses");
        paragraph.innerHTML = text; // Use innerHTML to interpret <br> as actual line breaks
    }
    
    
    // Call displayUsers function to fetch and display users
    displayUsers();
    
});