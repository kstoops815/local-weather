"use strict";

const weather = require("./weather");


let zip = $("#zipCode");
let zipCode = zip.val();

const disableBtn = () => {
	let query = zip.val();
    let isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(query);
    if(isValid) {
		 $("#getWeather").prop("disabled", false);
	} else {$("#getWeather").prop("disabled", true);
	}	
};

const validateZip = () => {
	zip.keyup(() => {
		disableBtn();
	});
};

const checkInp =() => {
	if(zip.val().length != 5 || zip.val() % zip.val() != 0) {
		window.alert("You must enter a 5 digit number!");
	}
};

const pressEnter = () => {
	zip.keypress((e) => {
		let zipCode = zip.val();

		disableBtn();
		if(e.key === "Enter") {
			checkInp();
			// console.log("pressEnter");
			weather.searchZip(zipCode);
			//zip.val("");
		}
	});
};

const clickButton = () => {
	$("#getWeather").click((e) => {
		let zipCode = zip.val();
		checkInp();
		//zip.val("");
		console.log(zip.val());
		disableBtn();
		weather.searchZip(zipCode);


	});
};

const threeDayClick = () => {
	console.log("in threeDayClick");
	let zipCode = zip.val();
 	$("#threeDay").click((e) => {
 		console.log("threeDay", e);
 		console.log("three day zip code", zipCode);
		weather.futureWeather(zip.val());
	});	
 };

module.exports = {disableBtn, pressEnter, clickButton, validateZip, threeDayClick};