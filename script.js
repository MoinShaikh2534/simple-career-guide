// Login form handling
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const mainContent = document.getElementById('main-content');

    // Initially hide the main content
    mainContent.style.display = 'none';

    // Handle form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from refreshing the page

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation check (expand this as needed)
        if (username.trim() !== '' && password.trim() !== '') {
            // Hide login section and show main content
            loginSection.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            alert('Please enter valid credentials.');
        }
    });
});
