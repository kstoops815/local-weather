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

const domString = (currentWeather) => {
	let domString = "";
		domString += `<div>`;
		domString += 	`<h3>Today's Weather in ${currentWeather.name}</h3>`;
		domString +=		`<p>Current Temperature: ${currentWeather.main.temp}</p>`;
		domString +=		`<p>Current Conditions: ${currentWeather.weather[0].description}</p>`;
		domString += 		`<p>Current Air pressure: ${currentWeather.main.pressure}</p>`;
		domString += 		`<p>Current Wind Speed: ${currentWeather.wind.speed}</p>`;
		domString += `</div>`;
		domString += `<button class="btn btn-default" id="threeDay" type="submit">3 Day Forecast</button>`;

		printToDom(domString);

	};

	
	


const printToDom = (strang) => {
//console.log("in domstring", domString);
$("#weatherGoesHere").html(strang);
};

module.exports = {domString};
},{}],3:[function(require,module,exports){
"use strict";

const weather = require("./weather");


let zip = $("#zipCode");

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

// const threeDayClick = () => {
// 	${"#threeDay"}.click((e) => {})
// }

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
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${weatherKey}&units=imperial`).done((data) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};



const searchZip = (zip) => {
	console.log("In searchZip");
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
	console.log("weather", weather);
	console.log("showWeather temp", weather.weather[0].description);
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
},{"./dom":2}]},{},[4]);
