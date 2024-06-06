import('node-fetch').then(({ default: fetch }) => {
    const express = require('express');
    const cors = require('cors');
    const path = require('path');
    const app = express();
    const port = 3321;

    app.use(cors());
    app.use(express.json());

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/app.js', (req, res) => {
        res.sendFile(path.join(__dirname, '', 'app.js'));
    });
    const cities = [
        { name: 'New York' },
        { name: 'London' },
        { name: 'Tokyo' },
        { name: 'Paris' },
        { name: 'Berlin' },
        { name: 'Sydney' },
        { name: 'Barcelona' },
        { name: 'Rome' },
        { name: 'Los Angeles' },
        { name: 'Chicago' },
        { name: 'Madrid' },
        { name: 'Toronto' },
        { name: 'Seoul' },
        { name: 'Melbourne' },
        { name: 'Mumbai' },
        { name: 'Cape Town' },
        { name: 'Dubai' },
        { name: 'Singapore' },
        { name: 'Hong Kong' },
        { name: 'Bangkok' },
        { name: 'Exeter'}
    ];

    app.get('/cities', (req, res) => {
        const query = req.query.query ? req.query.query.toLowerCase() : '';
        const filteredCities = cities.filter(city => city.name.toLowerCase().startsWith(query));
        console.log("Filtered cities:", filteredCities); 
        res.send(filteredCities);
    });    
    
    app.get('/weather', async (req, res) => {
        const city = req.query.city;
        // const apiKey = ''; 
        const apiKey = "Add your API key here"
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                res.send({ error: data.error.info });
            } else {
                const weatherData = {
                    location: data.location.name,
                    temperature: data.current.temp_c,
                    humidity: data.current.humidity,
                    wind: data.current.wind_mph,
                    cloud: data.current.cloud
                };
                res.send(weatherData);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send({ error: 'Something went wrong!' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    
});
