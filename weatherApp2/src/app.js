//Packages imports
import express from 'express';
import path from 'path';
import * as url from 'url';
import hbs from 'hbs';
import getWeather from "./utils/getWeather.js";

//Setup path & express config
const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');
const port = 3000 || process.env;


//getWeather.currentWeather();

//Setup templates directory for hbs
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setup static directory to serve
app.use(express.static(publicDir));

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weathie - Weather App'
    })
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page'
    })
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page'
    })
});

app.get('/weather-news', (req, res)=>{
    res.render('weather-news', {
        title: 'Help Page'
    })
});

app.get('/current-weahter', (req, res)=>{
    if (!req.query.lat || !req.query.lng) {
        return res.send({
            error: 'Ooopss something went wrong.'
        });
    }
    getWeather.geoLocationToName(req.query.lat, req.query.lng, (error, data)=>{
        try {
            res.send({
                icon: `https://weather-with-ai.p.rapidapi.com/get_weather/v1/${data.current.weather[0].icon}.png`,
                weatherDesc: data.current.weather[0].description,
                city: data.city,
                countryCode: data.countryCode,
                countryName: data.countryName
            });
        } catch(e) {
            res.send({
                error: 'Ooopss something went wrong with params make sure broswer geo location is enabled.',
                errorDesc:e,
            });
        }
    });

    getWeather.currentWeather(req.query.lat, req.query.lng , (error, data)=>{
        try {
            console.log(data)
            res.send({

            });
        } catch(e) {
            res.send({
                error: 'Ooopss something went wrong with params make sure broswer geo location is enabled.',
                errorDesc:e,
            });
        }
    });
});

app.get('/*', (req, res)=>{
    res.render('404', {
        title: '404 page not found'
    })
});

//Setup server
app.listen(port, ()=>{
    console.log(`Server is up on localhost:${port}`);
});

