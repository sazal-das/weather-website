const request = require('request');
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1Ijoic2F6YWxkYXMiLCJhIjoiY2s2eW1oNGc5MHdvbTNubXY0N3c2dzdmOSJ9.g5ARkS_IYe51rw5i0h8vEA&limit=1' 
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the internet!!',undefined);
        }else if(response.body.features.length===0){
            callback('Unable to find the address.Try again with another address!!');
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;