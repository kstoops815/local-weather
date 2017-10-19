(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
"use strict";

console.log("works?");

const events = require("./events");


events.disableBtn();
events.pressEnter();
events.clickButton();
events.validateZip();
},{"./events":1}]},{},[2]);
