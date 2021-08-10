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
const path_1 = __importDefault(require("path"));
const hbs_1 = __importDefault(require("hbs"));
const geocode_1 = require("./utils/geocode");
const forecast_1 = require("./utils/forecast");
const publicDirectory = path_1.default.join(__dirname, "../public");
const viewsPath = path_1.default.join(__dirname, "../templates/views");
const partialsPath = path_1.default.join(__dirname, "../templates/partials");
const app = express_1.default();
app.use(express_1.default.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs_1.default.registerPartials(partialsPath);
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Subham",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Subham",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "this is some help text",
        title: "Help page",
        name: "Subham",
    });
});
app.get("/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.query;
    if (!address || typeof address !== "string") {
        res.status(400);
        return res.send({
            error: "Address is required in the query",
        });
    }
    const geoData = yield geocode_1.geoCode(address);
    if (geoData) {
        const { latLng: [lat, lng], placeName, } = geoData;
        const weatherData = yield forecast_1.forecast(lat, lng);
        if (weatherData) {
            const { current } = weatherData;
            return res.send({
                current,
                placeName,
            });
        }
    }
    res.send({
        error: "Could not get weather data",
    });
}));
app.get("/help/*", (req, res) => {
    res.render("404", {
        name: "Subham",
        title: "Not found",
        message: "Help article not found",
    });
}),
    app.get("*", (req, res) => {
        res.render("404", {
            name: "Subham",
            title: "404",
            message: "Page not found",
        });
    });
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
//# sourceMappingURL=index.js.map