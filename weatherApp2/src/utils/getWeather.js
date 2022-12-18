import axios from 'axios';

export default {
    geoLocationToName(lat, lng, callback){
        const options = {
            method: 'GET',
            url: 'https://weather-with-ai.p.rapidapi.com/get_weather/v1',
            params: {lat,lng},
            headers: {
                'X-RapidAPI-Key': '377a9a510bmsh52f1973b70d5c28p136691jsn5d67042fa668',
                'X-RapidAPI-Host': 'weather-with-ai.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            const data = response.data;
            try {
                callback(undefined, data);
            } catch (error) {
                callback(error,undefined);
            }
        }).catch(function (error) {
            console.error(error);
        });

    },

    currentWeather() {
        const options = {
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
            params: {lon, lat},
            headers: {
                'X-RapidAPI-Key': '377a9a510bmsh52f1973b70d5c28p136691jsn5d67042fa668',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            const data = response.data;
            try {
                callback(undefined, data);
            } catch (error) {
                callback(error,undefined);
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
}



