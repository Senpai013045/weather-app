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
exports.geoCode = void 0;
const axios_1 = __importDefault(require("axios"));
const geoCode = (place) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1Ijoic2VucGFpMDEzMDQ1IiwiYSI6ImNrczN6dDlycDBzaWwydm10YXpveXR1eXoifQ.go9eT1BAS9DmvRAgYxgfTQ&limit=1`);
        const { data } = response;
        if (data.features[0]) {
            const latLng = data.features[0].center;
            const placeName = data.features[0].place_name;
            return { latLng, placeName };
        }
        else {
            throw new Error(`Place: ${place} not found in the response`);
        }
    }
    catch (err) {
        console.error(err.message || "Error fetching the geolocation");
    }
});
exports.geoCode = geoCode;
//# sourceMappingURL=geocode.js.map