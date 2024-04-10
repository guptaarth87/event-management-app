// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        alert('Login successful');
        window.location.href = 'events.html'; // Redirect to events page after successful login
    } else {
        alert('Login failed');
    }
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        alert('Signup successful');
    } else {
        alert('Signup failed');
    }
});
