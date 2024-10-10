const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const formData = JSON.parse(event.body);
  
  // Send the data to Google Apps Script
  const response = await fetch('https://script.google.com/macros/s/AKfycbwMs_rvEmoIZ82PDzZB2GQqINUiuTHi9GtzLfDuDMeEC1sWHYmOQRQ00Nsf6qkPtLbr/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const result = await response.text();
  return {
    statusCode: 200,
    body: result,
  };
};
