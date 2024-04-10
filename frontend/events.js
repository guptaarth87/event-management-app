// Fetch events when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/events/all');
    const events = await response.json();
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    events.forEach(event => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${event.name} - Slots Available: ${event.slotsAvailable}`;
        eventsList.appendChild(li);
    });
});
