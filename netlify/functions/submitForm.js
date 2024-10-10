exports.handler = async (event, context) => {
    const fetch = await import('node-fetch');


    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: '',
        };
    }

  if (event.httpMethod === 'POST') {
    console.log('Received POST request');
    const data = JSON.parse(event.body);
    console.log('Received data:', data);

    try {
    // Forward data to Google Apps Script
    const response = await fetch.default('https://script.google.com/macros/s/AKfycbx8WVaWf0IhL5GgAY6exf5dnrSlhymAxd_3NEztbgn8P_jdYsRiMLeplttHHaYFj2IU/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('Response status from Google Apps Script:', response.status);


    const result = await response.text();
    console.log('Response from Google Apps Script:', result);

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',  // Allow all domains
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Allow methods
        },
        body: result,
      };
    } catch (error) {
      console.error('Error:', error);

      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',  // Allow all domains
        },
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  } else {
    console.log('Received non-POST request');
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',  // Allow all domains
      },
      body: 'Method Not Allowed',
    };
  }
};