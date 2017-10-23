"use strict";

const weather = require("./weather");

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/apiKeys.json").done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};


const retrieveKeys = () => {
	apiKeys().then((results) => {
		weather.setKey(results.owm.apiKey);
	}).catch((error) => {
		console.log("error in retrieveKeys", error);
	});
};

module.exports = {retrieveKeys};