// Fetch event details when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    // const eventId = /* Get the event ID from the URL or another source */;
    const response = await fetch(`/events/${eventId}`);
    const event = await response.json();
    const eventDetails = document.getElementById('eventDetails');
    eventDetails.innerHTML = `<h2>${event.name}</h2><p>Slots Available: ${event.slotsAvailable}</p>`;
    const bookEventBtn = document.getElementById('bookEventBtn');
    bookEventBtn.addEventListener('click', () => {
        window.location.href = 'eventBookForm.html'; // Redirect to booking form
    });
});
