import axios from "axios";
import chalk from "chalk";

export default {
    weather(city, country_code, callback){
        if(city !== undefined || country_code !== undefined){
            const options = {
                method: 'GET',
                url: `https://aerisweather1.p.rapidapi.com/observations/${city},${country_code}`,
                headers: {
                    'X-RapidAPI-Key': '377a9a510bmsh52f1973b70d5c28p136691jsn5d67042fa668',
                    'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
                }
            };

            axios.request(options).then( (response)=> {
                const data = response.data;
                try{
                    //callback(undefined, chalk.greenBright(`The weather in ${data.response.place.city} is currently ${data.response.ob.tempC} degrees celsius outside weather is ${data.response.ob.weather} long is: ${data.response.loc.long}  lat is: ${data.response.loc.lat}`));
                    callback(undefined, data);
                }catch (e){

                    callback(`Error Code: ${data.error.code}, Error Description: ${data.error.description}\nPlease make sure you have entered city and country code.\nExample: Tel Aviv IL`, undefined);
                }
            }).catch((error)=> {
                //console.error(error);
                callback(chalk.redBright('Unable to connect to network!'), undefined);
            });
        } else {
            callback('Please make sure you have entered city and country code.\nExample: New York US', undefined);
        }

    },
}