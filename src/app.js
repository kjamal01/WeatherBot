const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// PORT will be what heroku provides, or else it will default to port 30000
const port = process.env.PORT || 3000

// Define paths for express configurations
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (rew, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kanwal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'Kanwal'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Helpful Text",
        title: 'Help',
        name: 'Kanwal'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Toronto',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search'
        })
    }

    console.log(req.query.games)
    res.send ({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kanwal',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kanwal',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})