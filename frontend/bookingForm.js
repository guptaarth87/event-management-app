// Booking form submission
document.getElementById('bookingForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const eventId = /* Get the event ID from the URL or another source */;
    const name = document.getElementById('name').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const response = await fetch('/events/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId, name, mobileNumber })
    });
    if (response.ok) {
        alert('Booking successful');
        window.location.href = 'events.html'; // Redirect to events page after successful booking
    } else {
        alert('Booking failed');
    }
});
