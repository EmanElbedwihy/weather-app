const express = require('express')
const path=require('path')
const hbs=require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const public=path.join(__dirname,'../public')
const views=path.join(__dirname,'../templates/views')
const partials=path.join(__dirname,'../templates/partials')

const app = express()
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)

app.use(express.static(public))
app.get('', (req, res) => {
    res.render('index',{
        title:'weather app',
        name:'Eman'
    })

})
app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name:'Eman'
    })

})
app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        name:'Eman'
    })

})


app.get('/weather', (req, res) => {
    if(!req.query.city)
    {
        res.send({
            error:'you must provide a city'
        })
    }
    else{

        geocode(req.query.city, (error, {lat,long,loc}={}) => {
        if(error)
        {
            res.send({
                error
            })
        }
        else
        {
            forecast(lat, long, (error, {temp,feel,desc}={}) => {
        if(error)
        {
            res.send({
                error
            })
    
        }
        else
        {
            res.send({
                location:loc,
                temp:temp,
                feelslike:feel,
                description:desc
            })
        }
    })
        }
        
    
    })
    
    
    
    }
    

})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Eman',
        error:'help article not found'
    })

})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Eman',
        error:'404 page'
    })

})

app.listen(3000, () => {
    console.log('server is up')
})