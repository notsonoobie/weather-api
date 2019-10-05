const path = require('path');       // CROSS PLATFORM PATH RESOLVING CORE MODULE
const express = require('express'); // WEB FRAMEWORK
const app = express();
const hbs = require('hbs'); // HANDLEBAR TEMPLATE ENGINE

const geocode = require('./utils/geocode');      // CUSTOM HANDLER
const weatherStats = require('./utils/weather'); // CUSTOM HANDLER
const port = process.env.PORT || 3000;

const absURL = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials'); // PARTIALS ARE KIND OF COMPONENTS, WE CAN USE ACROSS PAGES 

// Handlebar Engine Setup and Views Loction Configuration 
app.set('view engine','hbs');  // DYNAMIC TEMPLATING
app.set('views',viewsPath); // DEFAULT RENDERING HAPPENS FROM 'views' DIRECTORY, BUT WE CAN CHANGE THE 'viewS' SETTINGS
hbs.registerPartials(partialsPath); // PARTIAL CONFIGURATION

app.use(express.static(absURL)); // WE REQUIRE ABSOLUTE URL FOR SERVING ASSETS USING EXPRESS

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather API',
        name: 'Dark Sky'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Rahul Gupta'
    })
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name : 'Rahul Gupta'
    })
});
app.get('/weather',(req,res)=>{
    const loc = req.query.address;
    if(!loc){
        return res.send({
            "error"   : "You must provide search query with url",
            "status"  : "404",
            "example" : "/weather?address=:location",
            "author"  : "Rahul Gupta",
            "website" : "www.rahulgupta.epizy.com"
        })
    }

    geocode(loc,(error,{ lat, long, location } = {})=>{  // Destructured Object
        if(error){
            return res.send({
                "error"   : "Something went wrong!",
                "status"    : "400",
                "author"  : "Rahul Gupta",
                "website" : "www.rahulgupta.epizy.com"
            })
        }
        weatherStats(lat,long,(error,{ temperature:temp, icon, humidity })=>{
            if(error){
                return res.send({
                    "error"   : "Could not serve at this moment!",
                    "status"    : "400",
                    "author"  : "Rahul Gupta",
                    "website" : "www.rahulgupta.epizy.com"
                })
            }
            return res.send({
                "status"   : "200",
                "address"  : location,
                "forecast" : `Temperature is ${temp} deg F, ${icon}, Humidity is ${(humidity)*100}%, Have a Good Day!`,
                "author"   : "Rahul Gupta",
                "website"  : "www.rahulgupta.epizy.com"
            })
        });
    });

});
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help page not found !'
    })
});
app.get('/about/*',(req,res)=>{
    res.render('404',{
        title: 'About page not found !'
    })
});
app.get('*',(req,res)=>{  // Wildcard represents all page except listed above
    res.render('404',{
        title: '404! Page Note Found !'
    });
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});