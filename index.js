const express = require('express');
const requests = require('requests');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/weather', (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send({ error: "City name is required" });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    requests(apiUrl)
        .on('data', (chunk) => {
            const data = JSON.parse(chunk);
            res.json(data);
        })
        .on('error', (err) => {
            res.status(500).send({ error: "Error fetching weather data" });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
