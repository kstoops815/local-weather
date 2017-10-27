"use strict";

let weatherKey;
const dom = require("./dom");

const searchWeather = (zip) => {
	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${weatherKey}&units=imperial`).done((data) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};



const searchZip = (zip) => {
	console.log("In searchZip", typeof(zip));
	searchWeather(zip).then((data) => {
		console.log("data", data);
		showWeather(data);

	}).catch((error) => {
		console.log("error in search weather", error);
	});
};

const setKey = (apiKey) => {
	weatherKey = apiKey;
	console.log("weatherKey", weatherKey);
};

const showWeather = (weather) => {
	console.log("showWeather temp", weather.weather[0].description);
	$("#threeDay").removeClass("hidden");
	dom.domString(weather);
};

const futureWeather = (zip) => {
	return new Promise ((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&APPID=${weatherKey}&units=imperial`).done((data) => {
			console.log("forecast data", data);
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};


module.exports = {setKey, searchZip, futureWeather};