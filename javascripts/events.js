"use strict";

let zip = $("#zipCode");

const disableBtn = () => {
	console.log("disable");
    if(zip.val().length === 5) {
		 $("#getWeather").prop("disabled", false);
	} else {$("#getWeather").prop("disabled", true);
	}	
};

const validateZip = () => {
	zip.keyup(() => {
		console.log("anything");
		disableBtn();
	});
};

const checkInp =() => {
	if(zip % 1 != 0) {
		window.alert("You must enter a 5 digit number!");
	}
};

const pressEnter = () => {
	zip.keypress((e) => {
		disableBtn();
		if(e.key === "Enter") {
			checkInp();
			console.log("pressEnter");
			

		}
	});
};

const clickButton = () => {
	$("#getWeather").click((e) => {
		console.log("click button");
		checkInp();
		zip.val("");
		disableBtn();

	});
};

module.exports = {disableBtn, pressEnter, clickButton, validateZip};