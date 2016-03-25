//------------------------------
// Weather and Forecast App
//------------------------------

// VARIABLES

var txtForecast;
var simple;
var url;

var context;

var currentTemplate;
var forecastTemplate;
var foreInnerTemplate;

var currTempScript;
var foreTempScript;
var foreInnTempScript;

var foreInnHTML;
var foreHTML;
var currHTML;


//------------------------------
// UPDATE WEATHER
//------------------------------


// Get Weather Function
function getWeather() {

	// Concatenate state and city into API url
	url = "http://api.wunderground.com/api/59a1e94d23db4135/forecast10day/q/";
	url += context.state + '/' + context.city + '.json';

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
		context.time = weatherInfo.forecast.txt_forecast.date;
		context.day = txtForecast[0].title;
		context.weather = txtForecast[0].fcttext;
		context.icon = txtForecast[0].icon_url;

		currHTML = currTempScript(context);

		$("#current").append(currHTML);

		//------------------------------
		// 10-day FORECAST
		//------------------------------

		// Forecast Title and Scrollbox
		//------------------------------

		foreHTML = foreTempScript(context);	
		// Append #forecast_content script
		$("#forecast").append(foreHTML);


		// Scrollbox: 10-day Weather
		//------------------------------	

		// 10-day forecast: loop for each day's info
		for (i = 0; i < 19; i += 2) {

			// forecast: Get info from API 
			context.day = txtForecast[i].title;
			context.weather = txtForecast[i].fcttext;
			context.icon = txtForecast[i].icon_url;
		
			foreInnHTML = foreInnTempScript(context);

			// Append scrollbox content
			$("#scrollBox").append(foreInnHTML);
		}
	});
}

//------------------------------
// HANDLEBARS
//------------------------------

// Retrieve the template data from the HTML
currentTemplate = $('#current_content').html();
forecastTemplate = $('#forecast_content').html();
foreInnerTemplate = $('#forecast_inner').html();

// Object API variables will go in
context = { 
"city": "", 
"state": "",
"day": "",
"time": "",
"weather": ""
};

// Compile the templates' data into a function
currTempScript = Handlebars.compile(currentTemplate);
foreTempScript = Handlebars.compile(forecastTemplate);
foreInnTempScript = Handlebars.compile(foreInnerTemplate);


//------------------------------
// BUTTON CLICK
//------------------------------

// When GO button is clicked
$("#button").click( function(event){
	event.preventDefault();

	//Get CITY input
	context.city = $("#input_city").val();

	//Get STATE input
	context.state = $("#input_state").val();

	// If both CITY and STATE input
	// are filled out, then update weather 
	if (context.city !== '' && context.state !== '') {

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
	} else if ( context.state === '' ) {

		$("#input_state").css("border", "solid 2px #CC0000").focus();
		$("#input_city").css("border", "2px inset");

		// if CITY input is empty, alert user
	} else if ( context.city === '' ) {

		$("#input_city").css("border", "solid 2px #CC0000").focus();
		$("#input_state").css("border", "2px inset");
	}
});

