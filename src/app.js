const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode= require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port= process.env.PORT || 3000

//path for express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine n views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

//home_page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rohit Bathi'
    })
})

//about_page
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather Application',
        name:'Rohit Bathi'
    })
})

//help_page
app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'help message',
        title:'Help',
        name:'Rohit Bathi',
    })
})

//weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            
            res.send({
                address:req.query.address,
                location:location,
                forecast:forecastData
            })
        })
    })    
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

//no matching sub-url of help
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Rohit Bathi',
        error:'Help page not found'
    })
})

//no matching root url
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Rohit Bathi',
        error:'Page not found'
    })
})

//server status
app.listen(port,()=>{
    console.log('server is up on port '+port)
})