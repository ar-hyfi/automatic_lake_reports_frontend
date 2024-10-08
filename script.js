document.getElementById('lake-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const lake = document.getElementById('lake').value;
    const frequency = document.getElementById('frequency').value;

    // Example POST request to Google Apps Script
    const url = "YOUR_GOOGLE_APPS_SCRIPT_URL";  // Replace with your Google Apps Script Web App URL

    fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lake: lake,
            frequency: frequency,
        }),
    }).then(response => {
        alert("Form Submitted!");
    }).catch(error => {
        alert("Error: " + error);
    });
});
