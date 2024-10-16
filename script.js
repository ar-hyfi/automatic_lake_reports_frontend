// Lake data including Plus Codes
const lakeData = {
    'rainbow': {
        name: 'Rainbow Lake',
        plusCode: '86MQ48G2+8P96',
        legalLevel: [585.85,585.95]
    },
    'silver': {
        name: 'Silver Lake',
        plusCode: '86MMMF4C+RG83',
    },
    'higgins': {
        name: 'Higgins Lake',
        plusCode: '86PQC8MH+Q6V9',
        legalLevel: 1153.61
    },
    'houghton': {
        name: 'Houghton Lake',
        plusCode: '86PQC655+4WM9'
    },
    'sunset': {
        name: 'Sunset Lake',
        plusCode: '86JP4F97+H83W'
    },
    'manistique': {
        name: 'Manistique Lake',
        plusCode: '86RP678F+JGRX'
    },
    'george': {
        name: 'Lake George',
        plusCode: '86HHWV98+X77R'
    },
    'posey': { 
        name: 'Posey Lake',
        plusCode: '86HQVMWR+87W9'
    },
    'indian': {
        name: 'Indian Lake',
        plusCode: '86QMXPR6+JRR2',
        legalLevel: 612.32
    }

};

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const lakeSelectionDiv = document.getElementById('lake-selection');
    
    // If no specific lakes are provided in the URL, show all lakes
    const selectedLakes = params.keys().next().done ? Object.keys(lakeData) : Array.from(params.keys());

    // Generate checkboxes dynamically
    selectedLakes.forEach(lake => {
        if (lakeData[lake]) {
            const checkboxDiv = document.createElement('div');
            checkboxDiv.innerHTML = `
                <input type="checkbox" id="${lake}" name="lakes" value="${lake}">
                <label for="${lake}">${lakeData[lake].name}</label>
            `;
            lakeSelectionDiv.appendChild(checkboxDiv);
        }
    });
});

document.getElementById('lake-selection-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get email input value
        // Get name and email input values
    const firstNameInput = document.getElementById('firstName').value;
    const lastNameInput = document.getElementById('lastName').value;
    const emailInput = document.getElementById('email').value;

    // Validate email before proceeding
    if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address.");
        return;
    }

    const selectedLakes = Array.from(document.querySelectorAll('input[name="lakes"]:checked')).map(lake => lake.value);
    const lakeFrequenciesDiv = document.getElementById('lake-frequencies');

    // Clear any existing content
    lakeFrequenciesDiv.innerHTML = '';

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

      // Always create hidden inputs for legal levels, even if it doesn't exist (use empty string if missing)
      const legalLevels = document.createElement('input');
      legalLevels.setAttribute('type', 'hidden');
      legalLevels.setAttribute('name', `${lake}-legalLevels`);
      legalLevels.setAttribute('value', lakeData[lake].legalLevel || ''); // Set as empty if no legalLevel
      lakeFrequenciesDiv.appendChild(legalLevels);
    });

        // Add hidden inputs for first name, last name, and email
        lakeFrequenciesDiv.innerHTML += `
        <input type="hidden" name="firstName" value="${firstNameInput}">
        <input type="hidden" name="lastName" value="${lastNameInput}">
        <input type="hidden" name="email" value="${emailInput}">
    `;

    // Show the frequency selection form
    document.getElementById('frequency-selection-form').style.display = 'block';
    document.getElementById('lake-selection-form').style.display = 'none';
});

document.getElementById('frequency-selection-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Show spinner and hide button text
    document.getElementById('submitBtnText').style.display = 'none';
    document.getElementById('spinner').style.display = 'block';

    const formData = new FormData(e.target);
    const data = {};

    // Collect the frequency and plus code for each selected lake
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    console.log(data, 'data');

    // Use the Netlify function URL instead of Google Apps Script URL
    const url = "https://magical-madeleine-43d341.netlify.app/.netlify/functions/submitForm";

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    }).then(responseText => {
        console.log(responseText); // Log success response
        document.querySelector('.form-box').innerHTML = `
            <h1>Thank You!</h1>
            <p>Your preferences have been successfully submitted.</p>
        `;
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert("Error: " + error);

            // Reset button back to original
            document.getElementById('submitBtnText').style.display = 'block';
            document.getElementById('spinner').style.display = 'none';
    });
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
