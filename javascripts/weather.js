"use strict";

let weatherKey;
const dom = require("./dom");

const searchWeather = (zip) => {
	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${weatherKey}`).done((data) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};



const searchZip = (zip) => {
	let weatherInfo = [];
	console.log("In searchZip");
	searchWeather(zip).then((data) => {
		weatherInfo.push(Object.values(data));
		console.log("weatherInfo", weatherInfo);
		showWeather(weatherInfo);
	}).catch((error) => {
		console.log("error in search weather", error);
	});
};

const setKey = (apiKey) => {
	weatherKey = apiKey;
	console.log("weatherKey", weatherKey);
};

const showWeather = (weatherArray) => {
	console.log("weather array", weatherArray);
	dom.domString(weatherArray);
};


module.exports = {setKey, searchZip};