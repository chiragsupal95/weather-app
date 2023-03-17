const express = require('express');
const path = require('path');
const hbs = require('hbs');

//utils modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();



const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chirag Supal'
    });
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Chirag',
        name: 'Chirag Vinod Supal'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help1: 'About us',
        help2: 'Contact us'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude,longitude, locality} = {}) => {
        if(error){
           return res.send({error});
        }                      

        forecast( longitude,latitude,  (error, forecastData) => {
            if(error){
                return res.send({error});
            }               
            res.send({
                forecast: forecastData,
                locality  ,
                address: req.query.address
            });                       
        })
        
    })


    // res.send({
    //     forecast: '',
    //     location: '',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
    console.log(req.query.search);
})

app.get('/help/*', (req, res)=> {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        errorMessage: 'Error 404! page not found.'
    })
})

app.listen(3000, ()=> {
    console.log('::::: Server is Up on port 3000 :::::');
})