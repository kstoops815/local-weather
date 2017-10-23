"use strict";

const weather = require("./weather");


let zip = $("#zipCode");

const disableBtn = () => {
    if(zip.val().length === 5) {
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
	if(zip.val().length != 5) {
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
			

		}
	});
};

const clickButton = () => {
	$("#getWeather").click((e) => {
		let zipCode = zip.val();
		checkInp();
		zip.val("");
		disableBtn();
		weather.searchZip(zipCode);

	});
};

module.exports = {disableBtn, pressEnter, clickButton, validateZip};