import express, {Request, Response} from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// import{connectToMongo, closeMongo,insertData} from './Mongo'

const app = express();
const port = 4000;

app.use(express.static('../client'));
app.use(express.json({limit: '2mb'}));

app.listen(port, ()=> console.log(`running on port ${port}`));

// connectToMongo().then(()=>{
    app.post('/weather', async(req:Request, res:Response) => {
        console.log('request received!');
        // const data = req.body;
        // res.send(data);
        
        const {lat,lon,cityID,countryID} = req.body;
    
        if (
            (lat === undefined || lon === undefined) &&
            (cityID === undefined || cityID === "" || cityID === null)
        ) {
            const errorResponse = { success: false, message: "You put nothing...", data: { invalidCityID: cityID } };
            return res.status(400).json(errorResponse);
        }
    
        try{
            let url:string;
            const key:string | undefined = process.env.API_KEY;
            const cityValue: string = encodeURIComponent(cityID);
            if (countryID === "QS"){
                url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
            } else {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryID}&appid=${key}&units=metric`;
            }
    
            const response = await axios.get(url);
            const weatherData = response.data;
    
            // insertData(weatherData)
    
            const successResponse = {success:true, message: "Server received your response", data:{weatherData}};
            return res.json(successResponse);
        }catch(e){
            const errorResponse = { success: false, message: "Enter a valid city" };
            return res.status(400).json(errorResponse);
        }
    })
    
    app.post('/location', async(req:Request, res:Response) => {
        try{
            let url:string;
            const {cityID,countryID} = req.body;
            const key:string | undefined = process.env.API_KEY;
            //encodeURIComponent removes the whitespaces from cityID
            const cityValue:string = encodeURIComponent(cityID);
            if (countryID == "QS") {
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${key}`
            }else{
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue},${countryID}&limit=1&appid=${key}`
            }
            const response = await axios.get(url);
            const locationData = response.data;
    
            // insertData(locationData[0]);
    
            const successResponse = {success: true, message: "Server received your location response ...", data:{locationData}}
            return res.json(successResponse);
        }catch(e){
            const errorResponse = {success: false, message: "Location did not work..."};
            return res.status(400).json(errorResponse);
        }
    })
// }).catch(error => {
//     console.error("Failed to connect to MongoDB:", error);
//     process.exit(1); // Exit the process if MongoDB connection fails
// });

// process.on('SIGINT', async()=>{
//     console.log("SHUTTING DOWN MONGO ...");
//     await closeMongo();
//     process.exit(0);
// })
