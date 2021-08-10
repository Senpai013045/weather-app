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
exports.forecast = void 0;
const axios_1 = __importDefault(require("axios"));
const forecast = (lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.troposphere.io/forecast/${lat},${lng}?token=e5e6b0fb6ba87c194ff46e91157c1c1e6ccf228642ce78bdea`);
        const { data: { error, data }, } = response;
        if (!error && data) {
            const { current } = data;
            return { current };
        }
        else {
            throw new Error(`Location not found`);
        }
    }
    catch (err) {
        console.error(err.message || "Error fetching the forecast data");
    }
});
exports.forecast = forecast;
//# sourceMappingURL=forecast.js.map