//todo Create a new Express web server with alignments and pattern with less comment
// todo take note from this web server 
// Express is a function and we call to create a new express application
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
// to generate the application is to call the function, doesn't take any argument
// we can configure our server by using various methods provided in the application
const app = express()

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//! Customizing the views directory
// Express hbs always looks for the folder views in default state
const viewsPath = path.join(__dirname, '../template/views')
// This line usually goes below the hbs config
app.set('views', viewsPath)

// Now we can tell our app what it should do by using get method
// get method lets us configure what the server should do when someone tries to get the resource  at a specific url
// This get method is used widely and takes in two arguments, first is route, 
// routing works same as it works vue in vue 
// Second argument is a function and thats where we describe what we wanna do when someone visits a particular route
// This function takes in two arguments, first one is an object containing info about incoming request
// Second argument is the response, response contains methods allowing us to customize what we are gonna send back to requester
// We could something like read from database or create html and use various methods on response to send a response back


//! Template engine using express (Handlebars) 
// Handlebars will allow us to render dynamic web pages
// handlebars will allow us to create reusable code that can be used in multiple pages
// Set allows you to set a value for a given express setting
// express expects all the handlebar views (hbs) to live in a folder called views in root of the directory

//! Steps of Adding Dynamic pages with hbs
// import hbs
// Config hbs in app.set
// Set up route with res.render method
// Create the dynamic page in the views folder name it as written render
// To send dynamic content to the views page we send an object as the second parameter to the views
// To use the dynamic content in the views we use {{}}
// Remove the static page if any

app.set('view engine', 'hbs') 
//! To configure directory to express to use it
// use function is a way to customize your server
// When we set up static path our app.get of root directory doesn't do anything 
// We don't individually doesn't have to link them all they all gets linked with on command 
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath)) 

// app.get('', (req, res)=>{
    // res.send('Hello express!')
    // Practically we will send back html or json to be rendered on the route
    
    //! Serving up Static file
    // To serve static file we have tell express the absolute path of our directory from root folder
    // To find out Check line: 8, 9
//     res.send('<h1>Hello, World!</h1>')
// })
// //! Setting routes
// app.get('/about', (req, res) =>{
//     // Sending JSON We send JSON as an object or and array
//     // express is gonna detect that we provided an object or an array and its automatically gonna stingify the json to JSON format 
//     res.send({
//         name: 'Joynal',
//         age: 22
//     })
// })
// app.get('/help', (req, res) =>{
//     res.send([{
//         name: 'Joynal',
//         age: 22
//     },{
//         name: 'Abdullah',
//         age: 5
//     }])
// })
//! Route for Dynamic Page/Content
app.get('', (req, res) =>{
    // render method allows us to render one of our views
    // second argument is an object we want to views to be able to access
    res.render('index', {
        title: 'Weather App',
        name: 'Joynal Abedin'
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Page',
        name: 'Joynal Abedin'
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        name: 'Joynal Abedin',
        msg: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
    })
})
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name: placeName} ={}) => {
        if(error){
            return res.send({ error })
        } 
        forecast(longitude, latitude, (error, {temperature, feelsLike, weather_descriptions: weatherDescriptions, humidity } = {})=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                placeName,
                address: req.query.address,
                temperature,
                feelsLike,
                weatherDescriptions,
                humidity 
            })
        })
    })
})
// The key pair value or the query string of the url is available to us inside our express route handler
// Inside the request parameter inside query object and contains query sting info
app.get('/products', (req, res) =>{
    // console.log(req.query.search)
    // console.log(req.query.rating)
    // ! Very important We can not response to a request twice
    // if(req.query.search){
    //     res.send({ 
    //         products: []
    //     })
    // } else{
    //     res.send({
    //         error: 'No search query found!'
    //     })
    // }
    // * Reason behind using return instead of else statement is it is more commonly used
    if(!req.query.search){
        return res.send({
            error: 'Please provide a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404 page',
        name: 'Joynal Abedin',
        errorMessage: 'Help article Not found'
    })
})
//! Route for 404
// This * known as wildcard character means everything is match that hasn't been match so far
// Route for 404 comes last as express search from top to bottom
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Joynal Abedin',
        errorMessage: '404, Page not found'
    })
})

//! Partials with handlebars / Advance template
// Allows you to create little template which is part of a bigger part of web page and can be reused in different pages 
// Telling hbs the location of partials
const partialsPath = path.join(__dirname, '../template/partials')
// Now we can configure it
// registerPartials() take a path to the directory where partials lives
hbs.registerPartials(partialsPath)
// To start the server on the app which we will only ever use only one time
app.listen(3000, () =>{
    console.log('Server is up at port: 3000.')
})

// Heroku is used to deploy node.js application to production i.e the heroku server