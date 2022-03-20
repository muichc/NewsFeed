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
const node_fetch_1 = __importDefault(require("node-fetch"));
const db = require('../../../models');
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestHeaders = { 'X-Api-Key': process.env.NEWS_API_KEY3 || '' };
        let url = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
        const response = yield (0, node_fetch_1.default)(`${url}country=us`, {
            headers: requestHeaders
        });
        const parsedResponse = yield response.json();
        res.status(200).json({ response: parsedResponse });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
const showByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestHeaders = { 'X-Api-Key': process.env.NEWS_API_KEY3 || '' };
        let url = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
        const response = yield (0, node_fetch_1.default)(`${url}country=us&category=${req.body.category}`, {
            headers: requestHeaders
        });
        const parsedResponse = yield response.json();
        res.status(200).json({ response: parsedResponse });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
const showByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [categoryQuery, countryQuery] = getQueries(req.body);
        let url = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
        const parsedResponse = yield fetchNewsByCategories(categoryQuery, url);
        const finalResponse = yield fetchNewsByCountry(parsedResponse, countryQuery, url);
        res.status(200).json({ response: finalResponse });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Server error: ${error}` });
    }
});
const getQueries = (userCategories) => {
    const dbCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    let categoryQuery = '';
    const countryQuery = [];
    try {
        for (let i in userCategories) {
            if (dbCategories.includes(userCategories[i])) {
                categoryQuery += `&category=${userCategories[i]}`;
            }
            else {
                countryQuery.push(userCategories[i]);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    return [categoryQuery, countryQuery];
};
const fetchNewsByCategories = (query, url) => __awaiter(void 0, void 0, void 0, function* () {
    const requestHeaders = { 'X-Api-Key': process.env.NEWS_API_KEY3 || '' };
    try {
        const response = yield (0, node_fetch_1.default)(`${url}country=us${query}`, {
            headers: requestHeaders
        });
        const parsedResponse = response.json();
        return parsedResponse;
    }
    catch (error) {
        console.log(error);
    }
});
const fetchNewsByCountry = (results, query, url) => __awaiter(void 0, void 0, void 0, function* () {
    const requestHeaders = { 'X-Api-Key': process.env.NEWS_API_KEY3 || '' };
    try {
        for (let i of query) {
            const cat = yield db.category.findOne({ where: { name: i }, attributes: ['abbreviation'] });
            const countryResponse = yield (0, node_fetch_1.default)(`${url}country=${cat.dataValues.abbreviation}&category=general&pageSize=5`, {
                headers: requestHeaders
            });
            const parsedCountryResponse = yield countryResponse.json();
            if (parsedCountryResponse.totalResults > 0) {
                results.totalResults += parsedCountryResponse.totalResults;
                results.articles.push.apply(parsedCountryResponse.articles);
            }
        }
        return results;
    }
    catch (error) {
        console.log("Error fetching, ", error);
    }
});
module.exports = {
    show,
    showByCategory,
    showByUser
};
//# sourceMappingURL=news.js.map