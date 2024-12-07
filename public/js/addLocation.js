
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('locationForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('locationName').value;
        const openTime = document.getElementById('openTime').value;
        const closeTime = document.getElementById('closeTime').value;
        
        const data = {name, openTime, closeTime};

        try{
            const response = await fetch('/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Location submitted successfully: ' + JSON.stringify(result));
                window.location.href = '/';
            } else {
                const errorText = await response.text();
                alert('Error submitting location: ' + errorText);
            }

        } catch (err) {
            console.error('Error:', err);
            alert('Failed to submit location.');

        }
    });
});