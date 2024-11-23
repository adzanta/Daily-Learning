document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock login credentials
    const mockUser = {
        username: 'teacher',
        password: '123'
    };

    // Simple validation
    if (username === mockUser.username && password === mockUser.password) {
        window.location.href = "dashboard.html";
        // Redirect or perform further actions here
    } else {
        document.getElementById('message').innerText = 'Invalid username or password.';
    }
    
});