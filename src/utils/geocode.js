const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=2e8bf3e47b5778fc15c76f81a84a89d0&query='+ encodeURIComponent(address);
    request({url: url, json: true}, (error,{body} = {}) => {
        if(error){
            callback('Unable to connect to the server.',undefined);
        }
        else if(body.data.length === 0){
            callback('Location not found',undefined);
        }
        else{
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                locality: body.data[0].locality
            })
        }
    })
    
}

module.exports = geocode;