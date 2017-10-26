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