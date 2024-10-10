const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);

    // Forward data to Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbwMs_rvEmoIZ82PDzZB2GQqINUiuTHi9GtzLfDuDMeEC1sWHYmOQRQ00Nsf6qkPtLbr/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    return {
      statusCode: 200,
      body: result,
    };
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
};