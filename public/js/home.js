document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reservation-form");
    initializeReservations()
    async function initializeReservations(){
        reservations = await fetchAllReservations();
        displayReservations(reservations);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const user = document.getElementById("user").value;
        const location = document.getElementById("location").value;

        let reservations = [];

        if (user) {
            // Fetch all reservations for the selected user
            console.log("Trying to be specific..")
            reservations = await fetchReservationsByUser(user);
        } else {
            // Fetch all reservations if no user is selected
            reservations = await fetchAllReservations();
        }

        console.log("User: " + user)

        if (location) {
            //Only print reservations with the specified location
            reservations = reservations.filter((res) => res.location._id === location);
        }

        reservations.forEach(reservation => {
            console.log("reservation: " + reservation.user._id)
        });

        displayReservations(reservations);
    });

    async function fetchReservationsByUser(userId) {
        let reservations = [];
        try {
            const response = await fetch(`/reservationByUserID?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            reservations = await response.json();
        } catch (error) {
            console.error("Failed to fetch reservations by user:", error.message);
        }
    
        return reservations;
    }

    async function fetchAllReservations() {
        let reservations = [];
        try {
            const response = await fetch(`/reservations2`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            reservations = await response.json();
        } catch (error) {
            console.error("Failed to fetch all reservations:", error.message);
        }

        return reservations;
    }

    function displayReservations(reservations = []) {
        const list = document.getElementById("reservation-list");
        list.innerHTML = ""; // Clear the list before updating
    
        if (reservations.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.textContent = "No reservations found.";
            list.appendChild(emptyMessage);
            return;
        }
    
        reservations.forEach((reservation) => {
            const listElem = document.createElement("li");
    
            var userName = reservation.user ? reservation.user.fname : "Unknown Name";
            userName += " "
            userName += reservation.user ? reservation.user.lname : "Unknown Name";
            const locationName = reservation.location ? reservation.location.name : "Unknown Location";
            const startTime = reservation ? reservation.startTime : "Unknown Start Time";
            const endTime = reservation ? reservation.endTime : "Unknown End Time";
            
    
            listElem.innerHTML = `User: ${userName}<br>Location: ${locationName}<br>From ${startTime} to ${endTime}<br><br>`;
            list.appendChild(listElem);
        });
    }
    
});
