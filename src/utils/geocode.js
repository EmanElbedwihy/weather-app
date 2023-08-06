const request = require('request')
const geocode = (add, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(add) + '.json?access_token=pk.eyJ1IjoiaW1hbmVsYmVkd2loeSIsImEiOiJjbGtvMTJqankwcnhsM2ZxejJmMzcwODR3In0.rbxf7Pz9hFZ0YhJkU4Bbjw&limit=1'
    request({ url, json:true }, (error, {body}) => {
        if (error) {
            callback('cannot connect to the network')
        }
        else if (body.features.length == 0) {

            callback('cannot find the location')
        }
        else {
            callback(undefined,{
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                loc:body.features[0].place_name
            })
           
        }
    })
}

module.exports=geocode