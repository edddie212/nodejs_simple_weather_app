//Packages imports
import express, {query} from 'express';
import path from 'path';
import * as url from 'url';
import hbs from 'hbs';

//Custom imports
import geocode from "./utils/geocode.js";

//Setup oath & express config
const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');
const port = 3000;

//Setup templates directory for hbs
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

//Setup static directory to serve
app.use(express.static(publicDir));

//Setup templates to render
app.get('/', (req, res)=>{
    res.render('index', {
        title:  'Weather App',
        name:   'Chill Chill Megazaur',
        author: 'Chill Chill Megazaur'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title:  'Weather App - About Page',
        name:   'This is the about page',
        author: 'Chill Chill Megazaur'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title:  'Weather App - Help Page',
        name:   'This is the help page',
        author: 'Chill Chill Megazaur'
    });
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:  'Your Article can not be found.',
        name:   '404 Help Page',
        author: 'Chill Chill Megazaur'
    });
});

app.get('/weather', (req, res)=>{
    if (!req.query.country || !req.query.city) {
        return res.send({
            error: 'Please provide a city and country code.'
        });
    }
    geocode.weather(req.query.city,req.query.country, (error, data)=>{
        console.log(data)
        try{
            res.send({
                long            :data.response.loc.long,
                lat             :data.response.loc.lat,
                location        :`${req.query.city}, ${req.query.country} `,
                city            :req.query.city,
                country         :req.query.country,
                cityName        :data.response.place.city,
                rigionName      :data.response.place.name,
                rigionTzCode    :data.response.profile.tz,
                rigionTzName    :data.response.profile.tzname,
                tempC           :data.response.ob.tempC,
                tempF           :data.response.ob.tempF,
                humidity        :data.response.ob.humidity,
                windSpeedKPH    :data.response.ob.windSpeedKPH,
                forcastTime     :data.response.obDateTime,
                forcastDescShort:data.response.ob.weatherShort,
                forcastDesclong :data.response.ob.weatherPrimary,
                forcast         :data.response.ob.weather,
                day             :data.response.ob.isDay,
                sunrise         :data.response.ob.sunrise,
                sunset          :data.response.ob.sunset,
            });

        }catch (e) {
            res.send({
                error: 'Ooopss something went wrong!',
                errorDesc:e,
            });
        }

    });


});

//404 Page
app.get('/*', (req, res)=>{
    res.render('404', {
        title:  'Ooops your page is not found',
        name:   '404 Page',
        author: 'Chill Chill Megazaur'
    });
});

//Server
app.listen(port, ()=>{
    console.log(`Server is up on localhost:${port}`);
});
