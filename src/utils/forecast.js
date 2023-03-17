const request = require('request');

const forecast = (longitude, latitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d035dae46db9d9ccd6049217a884dd57&query='+ latitude +','+ longitude;
    request( { url: url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to connect to the server', undefined);
        }
        else if(body.error){
            callback('Unable to find location', undefined);
        }
        else{
            let weatherData = body.current;
            callback(undefined ,`It is currently ${weatherData.temperature} deegres out. There is ${weatherData.precip}% chance of rain.`);
        }
    } )
}

module.exports = forecast