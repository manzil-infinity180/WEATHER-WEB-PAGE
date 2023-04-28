const express = require('express');
const https= require('https')
const bodyParser = require('body-parser');
const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
     res.sendFile(__dirname+"/index.html");
     
   
})
app.post("/",function(req,res){
     const citynames= req.body.cityName;
     const url=`https://api.openweathermap.org/data/2.5/weather?q=${citynames}&appid=fd43d89d83cf687ac027e7c3e9ae7567&units=metric`
https.get(url,(response)=>{
     console.log(response.statusCode);
     response.on("data",(data)=>{
          const weatherData= JSON.parse(data);
          const temp=weatherData.main.temp;
          const weatherDescription =weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imgUrl =`https://openweathermap.org/img/wn/${icon}@2x.png`

          res.write(`<p>The weather is currently ${weatherDescription}</p> `);
          res.write(`<h1>The temperature in ${citynames} is ${temp} degree Celcius </h1>`);
          res.write(`<img src=${imgUrl}>`);
          res.send();

     })
})
})

/*


*/

app.listen(3000,()=>{
     console.log("listening the port 3000");
})