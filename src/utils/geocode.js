const request = require('request')

const geocode = (address, callback)=>{
    // The encodeURIComponent() function encodes a URI by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmFoaW1tIiwiYSI6ImNrcnl4b2FkMTBlMXkydnE3eXo3eXh5ejIifQ.IgbG-AyQ-GJvZwvZSQEa9g&limit=1`

    request({ url, json: true}, (err, { body })=>{
        if(err){
            callback('Cannot connect to the Geocoding Server!', undefined) 
        } else if ( body.message || body.features.length === 0){
            callback('Invalid Location!', undefined)
        } else{
            const data = body.features[0]
            callback(undefined , {
                latitude: data.center[0],
                longitude: data.center[1],
                place_name: data.place_name
            })
        }
    })    
}

module.exports = geocode
