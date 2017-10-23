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