"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const Mongo_1 = require("./Mongo");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.static("../client"));
app.use(express_1.default.json({ limit: "2mb" }));
app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(port, () => console.log(`running on port ${port}`));
(0, Mongo_1.connectToMongo)()
    .then(() => {
    app.post("/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("request received!");
        // const data = req.body;
        // res.send(data);
        const { lat, lon, cityID, countryID } = req.body;
        if ((lat === undefined || lon === undefined) &&
            (cityID === undefined || cityID === "" || cityID === null)) {
            const errorResponse = {
                success: false,
                message: "You put nothing...",
                data: { invalidCityID: cityID },
            };
            return res.status(400).json(errorResponse);
        }
        try {
            let url;
            const key = process.env.API_KEY;
            const cityValue = encodeURIComponent(cityID);
            if (countryID === "QS") {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
            }
            else {
                url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryID}&appid=${key}&units=metric`;
            }
            const response = yield axios_1.default.get(url);
            const weatherData = response.data;
            //MongoDB
            (0, Mongo_1.insertData)(weatherData);
            const successResponse = {
                success: true,
                message: "Server received your response",
                data: { weatherData },
            };
            return res.json(successResponse);
        }
        catch (e) {
            const errorResponse = { success: false, message: "Enter a valid city" };
            return res.status(400).json(errorResponse);
        }
    }));
    app.post("/location", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let url;
            const { cityID, countryID } = req.body;
            const key = process.env.API_KEY;
            //encodeURIComponent removes the whitespaces from cityID
            const cityValue = encodeURIComponent(cityID);
            if (countryID == "QS") {
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${key}`;
            }
            else {
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue},${countryID}&limit=1&appid=${key}`;
            }
            const response = yield axios_1.default.get(url);
            const locationData = response.data;
            (0, Mongo_1.insertData)(locationData[0]);
            const successResponse = {
                success: true,
                message: "Server received your location response ...",
                data: { locationData },
            };
            return res.json(successResponse);
        }
        catch (e) {
            const errorResponse = {
                success: false,
                message: "Location did not work...",
            };
            return res.status(400).json(errorResponse);
        }
    }));
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
});
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SHUTTING DOWN MONGO ...");
    yield (0, Mongo_1.closeMongo)();
    process.exit(0);
}));
