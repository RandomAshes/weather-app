//------------------------------
// Weather and Forecast App
//------------------------------

// VARIABLES

var txtForecast;
var simple;
var time;
var day;
var weather;
var icon;
var html;
var url;
var state;
var city;

//------------------------------
// UPDATE WEATHER
//------------------------------


// Get Weather Function
function getWeather() {

	// Concatenate state and city into API url
	url = "http://api.wunderground.com/api/59a1e94d23db4135/forecast10day/q/";
	url += state + '/' + city + '.json';

	// API Request
	$.getJSON(url, function(weatherInfo){

			// Get to txt-forecast
			txtForecast = weatherInfo.forecast.txt_forecast.forecastday;
			// Get to simple-forecast
			simple = weatherInfo.forecast.simpleforecast.forecastday;

			//------------------------------
			// CURRENT Weather Info
			//------------------------------

			// Current: Get Info
			time = weatherInfo.forecast.txt_forecast.date;
			day = txtForecast[0].title;
			weather = txtForecast[0].fcttext;
			icon = txtForecast[0].icon_url;

			// Current: Concatenate Info
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

			// Current: Append info to HTML
			$("#current").append(html);

			//------------------------------
			// 10-day FORECAST
			//------------------------------

			// forecast: Append Header and Div
			html = '<h3>Forecast for the next 10 days:</h3>';
			html += '<div id="scrollBox">';
			html += '</div>';

			$("#forecast").append(html);

			// forecast: loop for each day's info

			for (i = 0; i < 19; i += 2) {

					// forecast: Get info
					day = txtForecast[i].title;
					weather = txtForecast[i].fcttext;
					icon = txtForecast[i].icon_url;

					// forecast: Concatenate info
					html = '<h3 id="theDay">';
					html += day;
					html += '</h3>';
					html += '<img id="weatherImage" src="';
					html += icon;
					html += '">';
					html += '<p id="currentWeather">';
					html += weather;
					html += '</p>';

					// forecast: Append info to HTML
					$("#scrollBox").append(html);
					console.log(html);
			}
	});
}

// When GO button is clicked
$("#button").click( function(event){
	event.preventDefault();

	//Get CITY input
	city = $("#input_city").val();
	//Get STATE input
	state = $("#input_state").val();

	// If both CITY and STATE input
	// are filled out, then update weather 
	if (city !== '' && state !== '') {

		$("#input_city").val('');
		$("#input_state").val('');

		$("#input_city").css("border", "2px inset");
		$("#input_state").css("border", "2px inset");

		// Clear HTML Weather info
		//if there is any
		$("#current").empty();
		$("#forecast").empty();

		getWeather();

		// if STATE input is empty, alert user
	} else if ( state === '' ) {

		$("#input_state").css("border", "solid 2px #CC0000").focus();
		$("#input_city").css("border", "2px inset");

		// if CITY input is empty, alert user
	} else if ( city === '' ) {

		$("#input_city").css("border", "solid 2px #CC0000").focus();
		$("#input_state").css("border", "2px inset");
	}
});

