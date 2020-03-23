const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utile/geocode.js');
const forecast = require('./utile/forecast.js');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 3000;
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>');
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         Name: 'Sazal Chandra Das',
//         Age: 24
//     });
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>');
// })

app.get('/products',(req,res)=>{
    console.log(req.query);
    
    res.send({
        products: []
    })
})


// Define paths for express config
const publicFile = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars and views path
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialsPath);

//Setup static derectory to serve
app.use(express.static(publicFile));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sazal Chandra Das'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Sazal Chandra Das'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        msg:'Type your help here',
        name:'Sazal Chandra Das'
    })
});
//queary
app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            Error: 'You must provide a search address'
        })
    }
    const address = req.query.search;
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({Error: error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({Error: error});
            }
            res.send({
                Forecast: forecastData,
                location,
                Address: address
            })

        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sazal Das',
        errormsg:'Page Not Found'

    });
});





app.listen(port, ()=>{
    console.log('Server is running in '+ port);
    
})