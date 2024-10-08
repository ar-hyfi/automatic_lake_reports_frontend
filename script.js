// Lake data including Plus Codes
const lakeData = {
    'rainbow': {
        name: 'Rainbow Lake',
        plusCode: '84VXVF2M+VX'
    },
    'silver': {
        name: 'Silver Lake',
        plusCode: '84VXVF4F+8F'
    },
    'higgins': {
        name: 'Higgins Lake',
        plusCode: '84VXVG6M+5H'
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const lakeOptionsDiv = document.getElementById('lake-options');

    // Check if 'all' is in the URL, and display all lakes if true
    const showAllLakes = params.has('all');

    // Generate options dynamically
    for (const lake in lakeData) {
        if (showAllLakes || params.has(lake)) { // Show all lakes or specific lakes
            // Create a wrapper div to group label and select for each lake
            const lakeWrapper = document.createElement('div');
            lakeWrapper.classList.add('lake-wrapper');

            // Create label for lake frequency selection
            const lakeLabel = document.createElement('label');
            lakeLabel.setAttribute('for', `${lake}-frequency`);
            lakeLabel.textContent = `${lakeData[lake].name} Frequency:`;

            // Create frequency select
            const lakeSelect = document.createElement('select');
            lakeSelect.setAttribute('id', `${lake}-frequency`);
            lakeSelect.setAttribute('name', `${lake}-frequency`);
            lakeSelect.required = true;
            lakeSelect.innerHTML = `
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            `;

            // Append label and select to the wrapper
            lakeWrapper.appendChild(lakeLabel);
            lakeWrapper.appendChild(lakeSelect);

            // Create a hidden input to store Plus Code
            const hiddenPlusCode = document.createElement('input');
            hiddenPlusCode.setAttribute('type', 'hidden');
            hiddenPlusCode.setAttribute('id', `${lake}-plus-code`);
            hiddenPlusCode.setAttribute('name', `${lake}-plus-code`);
            hiddenPlusCode.setAttribute('value', lakeData[lake].plusCode);
            lakeWrapper.appendChild(hiddenPlusCode);

            // Append the wrapper to the form
            lakeOptionsDiv.appendChild(lakeWrapper);
        }
    }
});

document.getElementById('lake-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    // Collect lake frequencies and Plus Codes
    const lakes = {};
    for (const lake in lakeData) {
        if (document.getElementById(`${lake}-frequency`)) {
            lakes[lake] = {
                frequency: document.getElementById(`${lake}-frequency`).value,
                plusCode: document.getElementById(`${lake}-plus-code`).value
            };
        }
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
            lakes: lakes
        }),
    }).then(response => {
        alert("Form Submitted!");
    }).catch(error => {
        alert("Error: " + error);
    });
});
