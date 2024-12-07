// js/test.js
document.addEventListener("DOMContentLoaded", () => {

    async function getEverything() { 
        try {
            const response = await fetch('/database');
            const data = await response.json();
            console.log('Database:', data); // Log the fetched users
    
            return data;  // Return the data after it has been fetched
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function createReservation(data) { 
        const reservationData = {
            user: data.users[0]._id,
            location: data.locations[0]._id,
            startTime: "2024-12-07T10:00:00",
            endTime: "2024-12-07T12:00:00"
        };

        try {
            const response = await fetch('/submit-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            const result = await response.json();
            console.log('Reservation submitted successfully:', result);
        } catch (error) {
            console.error('Failed to submit reservation:', error.message);
        }
    }
    
    async function displayReservations() {
        var data = await getEverything();  // Wait for getUsers to finish and return the data
        //await createReservation(data);
        //Update Data
        data = await getEverything();
    
        let text = "";
    
        for (let i = 0; i < data.length; i++) {
            text += data[i];
            text += data[i];
            text += data[i] + "<br>";  // Use <br> to create a new line
        }
    
        let paragraph = document.getElementById("responses");
        paragraph.innerHTML = text; // Use innerHTML to interpret <br> as actual line breaks
    }
    
    
    // Call displayUsers function to fetch and display users
    displayReservations();
    
});