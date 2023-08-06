const request = require('request')
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c7328dc1ba95f6edb6c8e45d014814d&query=' + lat + ',' + long
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('cannot connect to the network')
        }
        else if (body.error) {

            callback('cannot find the location')
        }
        else {
            callback(undefined, 
                {temp:body.current.temperature,
                feel:body.current.feelslike,
                desc:body.current.weather_descriptions})
                

            }
        })
    }
module.exports = forecast