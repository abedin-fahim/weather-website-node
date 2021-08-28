// This is client side javascript which is going to run inside the browser

const weatherForm = document.getElementById('weatherForm')
const weatherInput = document.getElementById('weatherInput')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')
// const weatherData = async () => {
//     try {
//         const res = await fetch('http://localhost:3000/weather?address=chittagong')
//         const data = await res.json()
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log('Address', data.address)
//             console.log('Place Name', data.placeName)
//             console.log('Temperature', data.temperature)
//             console.log('Feels Like', data.feelsLike)
//             console.log('Humidity', data.humidity)
//             console.log('Weather Descriptions', data.weatherDescriptions)
//         }

//     } catch (e) {
//         console.log(e)
//     }
// }

// weatherData()

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = weatherInput.value
    message1.innerText = 'Loading...'
    message2.innerText = ''
    // Fetching data
    // Making sure there no problem if we are running from localhost or heroku
    fetch(`/weather?address=${location}`)
        .then((res)=>{
            res.json()
                .then((data) =>{
                    message1.innerText = ''
                    if(data.error){
                        message1.innerText = data.error
                    } else{
                        message2.innerText = `Place Name: ${data.placeName},
                        Temperature: ${data.temperature},
                        Feels Like: ${data.feelsLike},
                        Humidity: ${data.humidity},
                        Weather Descriptions: ${data.weatherDescriptions}
                        `
                    }
                })
        })
})
