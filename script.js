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

document.getElementById('lake-selection-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get email input value
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    // Validate email before proceeding
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    

    // Get selected lakes from checkboxes
    const selectedLakes = Array.from(document.querySelectorAll('input[name="lakes"]:checked')).map(lake => lake.value);
    const lakeFrequenciesDiv = document.getElementById('lake-frequencies');

    // Clear any existing content
    lakeFrequenciesDiv.innerHTML = '';

    // Generate frequency options for each selected lake and store the plus code
    selectedLakes.forEach(lake => {
        const lakeLabel = document.createElement('label');
        lakeLabel.textContent = `${lakeData[lake].name} Frequency:`;

        const lakeSelect = document.createElement('select');
        lakeSelect.setAttribute('name', `${lake}-frequency`);
        lakeSelect.required = true;
        lakeSelect.innerHTML = `
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        `;

        lakeFrequenciesDiv.appendChild(lakeLabel);
        lakeFrequenciesDiv.appendChild(lakeSelect);

        // Create a hidden input to store Plus Code
        const hiddenPlusCode = document.createElement('input');
        hiddenPlusCode.setAttribute('type', 'hidden');
        hiddenPlusCode.setAttribute('name', `${lake}-plusCode`);
        hiddenPlusCode.setAttribute('value', lakeData[lake].plusCode);
        lakeFrequenciesDiv.appendChild(hiddenPlusCode);
    });

    // Show the frequency selection form
    document.getElementById('frequency-selection-form').style.display = 'block';
    document.getElementById('lake-selection-form').style.display = 'none';
});

document.getElementById('frequency-selection-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    // Collect the frequency and plus code for each selected lake
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Example POST request to send data to your backend
    const url = "https://script.google.com/a/macros/hyfi.io/s/AKfycbzWm3E2uxOfK6EQJV-fwceYWqAn-hcTIXJglesnh0NnPkuCpmBjpetx-b7CKNwtTMv0/exec";  // Replace with your actual URL

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        alert("Form Submitted!");
    }).catch(error => {
        alert("Error: " + error);
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
