document.getElementById('lake-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const lake = Array.from(document.getElementById('lake').selectedOptions).map(option => option.value);
    const frequency = Array.from(document.getElementById('frequency').selectedOptions).map(option => option.value);

    // Validate email
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Example POST request to Google Apps Script
    const url = "YOUR_GOOGLE_APPS_SCRIPT_URL";  // Replace with your Google Apps Script Web App URL

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            lake: lake,
            frequency: frequency,
        }),
    }).then(response => {
        alert("Form Submitted!");
    }).catch(error => {
        alert("Error: " + error);
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
