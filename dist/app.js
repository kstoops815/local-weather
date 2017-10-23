(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./weather":5}],2:[function(require,module,exports){
"use strict";

const domString = (weatherArray) => {
	let domString = "";
	let weatherInfo = [];
	for(let i=0; i < weatherArray.length; i++){
		domString += `<div>`;
		domString += 	`<h3>Today's Weather</h3>`;
		domString +=		`<h4>${weatherArray[i].main.temp}</h4>`;
		domString +=		`<p>${weatherArray[i].weather.description}</p>`;
		domString += 		`<p>${weatherArray[i].main.pressure}</p>`;
		domString += 		`<p>${weatherArray[i].wind.speed}</p>`;
		domString += `</div>`;

	}

	printToDom(domString);
	console.log("in domstring", domString);

};

const printToDom = (strang) => {
	$("#weatherGoesHere").html(strang);
};

module.exports = {domString};
},{}],3:[function(require,module,exports){
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
},{"./weather":5}],4:[function(require,module,exports){
"use strict";

console.log("works?");

const events = require("./events");
const apiKeys = require("./apiKeys");


events.disableBtn();
events.pressEnter();
events.clickButton();
events.validateZip();
apiKeys.retrieveKeys();

},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
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
},{"./dom":2}]},{},[4]);
