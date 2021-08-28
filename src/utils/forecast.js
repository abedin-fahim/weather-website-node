const request =  require('request')

const forecast = (longitude, latitude, callback)=>{
    url = `http://api.weatherstack.com/current?access_key=19d901b469a5438c727f99fa5fe1535e&query=${longitude},${latitude}`

    request({url, json: true},  (err, { body })=>{
        if(err){
            callback('Cannot connect to weather server!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            const data = body.current
            callback(undefined, {
                temperature : data.temperature,
                feelsLike : data.feelslike,
                weather_descriptions: data.weather_descriptions[0],
                humidity : data.humidity
            })
        }
    })
}

module.exports = forecast