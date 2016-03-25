//------------------------------
// Weather and Forecast app
//------------------------------

// VARIABLES

// variable strings
var txtForecast
var simple

// variable info
var time;
var day;
var weather;
var icon;

var today;
var html;

var url;
var state;
var city;
var weatherInfo;


var input;


//------------------------------
// UPDATE WEATHER
//------------------------------

function getWeather() {

	console.log("request sent")
	// city = "Howell";
	// state = "Mi";

	url = "http://api.wunderground.com/api/59a1e94d23db4135/forecast10day/q/"
	url += state + '/' + city + '.json';

	$.getJSON(url, function(weatherInfo){
			// Get to txt-forecast
			txtForecast = weatherInfo["forecast"]["txt_forecast"]["forecastday"];
			// Get to simple-forecast
			simple = weatherInfo["forecast"]["simpleforecast"]["forecastday"];

			//------------------------------
			// CURRENT Weather Info
			//------------------------------

			// Get Info
			time = weatherInfo["forecast"]["txt_forecast"]["date"];
			day = txtForecast[0]["title"];
			weather = txtForecast[0]["fcttext"];
			icon = txtForecast[0]["icon_url"];

			// Concatenate Info
			html = '<h3>Today\'s Weather:</h3>';
			html += '<h1>' + city + ', ' + state + '</h1>';
			html += '	<h3 id="today">';
			html += day + ' ' + time;
			html += '</h3>';
			html += '<img id="weatherImage" src="';
			html += icon;
			html += '">';
			html += '<p id="currentWeather">';
			html += weather;
			html += '</p>';

			// Append info to HTML
			$("#current").append(html);

			//------------------------------
			// 10-day FORECAST
			//------------------------------


			// Append Header and Div
			html = '<h3>Forecast for the next 10 days:</h3>';
			html += '<div id="scrollBox">';
			html += '</div>';

			$("#forecast").append(html);


			// Loop for each day's info

			for (i = 0; i < 19; i += 2) {

					// Get info
					day = txtForecast[i]["title"];
					weather = txtForecast[i]["fcttext"];
					icon = txtForecast[i]["icon_url"];

					// Concatenate info
					html = '<h3 id="theDay">';
					html += day;
					html += '</h3>';
					html += '<img id="weatherImage" src="';
					html += icon;
					html += '">';
					html += '<p id="currentWeather">';
					html += weather;
					html += '</p>';

					// Append info to HTML
					$("#scrollBox").append(html);
					console.log(html);
			}
	});
}

$("#button").click( function(event){
	event.preventDefault();
	//Get city input
	city = $("#input_city").val();
	$("#input_city").val('');
	//Get state input
	state = $("#input_state").val();
	$("#input_state").val('');
	// Clear Weather Info if there is any
	$("#current").empty();
	$("#forecast").empty();

	if (city !== '' && state !== '') {
		getWeather();
	}
})

