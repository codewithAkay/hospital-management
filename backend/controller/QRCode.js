const express = require('express');
const app = express();
const axios = require('axios');
const { Sequelize } = require('sequelize');


// Set up the routes
app.get('/', async (req, res) => {
  try {
    // Make a GET request to the API URL
    const response = await axios.get('https://raq06bxfrk.execute-api.eu-west-1.amazonaws.com/apiqrcode');
    console.log(response)
    // Insert the response data into the database using Sequelize
    const data = response.data;
    const qrCode = await sequelize.models.QrCode.create({
      code: data.code,
      url: data.url,
      image: data.image
    });

    res.send(qrCode);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


