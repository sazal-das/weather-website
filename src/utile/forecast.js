const request = require('request');

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/dbebf25ca92105536e601c6242e4137a/'+latitude+','+longitude+'?units=si';
    request({url: url, json: true}, (error,{body})=>{

        if(error){
            callback('Unable to connect to the internet',undefined);
        }else if(body.error){
            callback('Unable to find the loaction',undefined);
        }else{
            callback(undefined, {
                temperature: 'Current Temperature: '+Math.ceil(body.currently.temperature)+' °C ',
                temperatureHigh: 'Today High Temperature is '+Math.ceil(body.daily.data[0].temperatureHigh)+' °C ',
                temperatureLow: 'Today Low Temperature is '+Math.ceil(body.daily.data[0].temperatureLow)+' °C ',
                forecast: body.daily.data[0].summary + 'There is a ' + Math.ceil(body.currently.precipProbability) + '% chance of rain.'
            }


                //body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            )
        }

    })

}

module.exports= forecast;