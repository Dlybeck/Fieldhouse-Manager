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
        const dateInput = document.getElementById('dateInput').value;

        const formattedDate = formatDate(dateInput)

        let reservations = [];

        if (user) {
            // Fetch all reservations for the selected user
            reservations = await fetchReservationsByUser(user);
        } else {
            // Fetch all reservations if no user is selected
            reservations = await fetchAllReservations();
        }

        if (location) {
            //Only print reservations with the specified location
            reservations = reservations.filter((res) => res.location._id === location);
        }

        if (dateInput) {
            //Only print reservations with the matching date
            reservations = reservations.filter((res) => res.date.localeCompare(formattedDate) == 0);
        }


        displayReservations(reservations);
    });


    function formatDate() {
        // Get the input value
        const dateValue = document.getElementById('dateInput').value; // "2024-12-13"

        // Split the date into components
        const [year, month, day] = dateValue.split('-');

        // Format the string
        const formattedDate = `${year}-${month}-${day}`;

        // Display the result
        return formattedDate;
    }

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
    
        // Sort reservations occurance
        const sortedReservations = [...reservations].sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.startTime}`);
            const dateB = new Date(`${b.date} ${b.startTime}`);
            return dateA - dateB;
        });
    
        sortedReservations.forEach((reservation) => {
            const listElem = document.createElement("li");
            listElem.id = "reservation-tile"
    
            var userName = reservation.user ? reservation.user.fname : "Unknown Name";
            userName += " "
            userName += reservation.user ? reservation.user.lname : "Unknown Name";
            const locationName = reservation.location ? reservation.location.name : "Unknown Location";
            const startTime = reservation ? reservation.startTime : "Unknown Start Time";
            const endTime = reservation ? reservation.endTime : "Unknown End Time";
            const date = reservation ? reservation.date : "Unknown Date"
            
            listElem.innerHTML = `<strong><u>User:</u></strong> ${userName}<br><strong><u>Location:</u></strong> ${locationName}<br><font size=4><b>${date} from ${startTime} to ${endTime}</b></font>`;
            var delButton = document.createElement("button");
            delButton.className="reservation-delete"
            delButton.id="reservation-delete"
            delButton.setAttribute("userID", reservation.user._id);
            delButton.setAttribute("locationID", reservation.location._id);
            delButton.setAttribute("reservationID", reservation._id);
            delButton.innerHTML = 'Delete Reservation'
            delButton.onclick
            list.appendChild(listElem);
            listElem.appendChild(delButton)
        });
    
        const buttons = document.querySelectorAll(".reservation-delete");
    
        // add delete vent listeners to each button
        buttons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const userID = event.target.getAttribute("userID");
                const reservationID = event.target.getAttribute("reservationID");
    
                if (confirm("Delete the reservation?")) {
                    await deleteReservation(userID, reservationID);
                    reservations = await fetchAllReservations();
                    displayReservations(reservations);
                    alert("Deleted");
                }
            });
        });
    }

    async function deleteReservation(userID, reservationID) {
        try {
            // creayte query string with all IDs
            const queryString = new URLSearchParams({
                userId: userID,
                reservationId: reservationID,
            }).toString();
    
            // Send request
            const response = await fetch(`/deleteReservation?${queryString}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const result = await response.json();
            console.log("Reservation deleted successfully:", result);
        } catch (error) {
            console.error("Failed to delete reservation:", error.message);
        }
    }
    

});
