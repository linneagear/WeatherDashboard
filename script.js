var cities = [];
var apiKey = "40d5fe5a931b845401c21e91e7d7a4ef";
var currentDay = moment().subtract(10, 'days').calendar();
// var displayMoment = document.getElementById('currentDay');
// displayMoment.innerHTML = nowMoment.format('MMMM Do YYYY');

$(document).ready(function() {
// when search is clicked
$("#button-addon2").on("click", function(event) {

    // put everything below inside a function, and on click at the end calling those functions

    event.preventDefault();
    getCurrentConditions();
    getCurrentForecast();

function getCurrentConditions() {
    // show the 5 day forecast 
    $(".col-8").addClass("show");

    // get user's input
    var city = $("#city-name").val().trim();
    // call API
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.name);

        // grab weather icon
        var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
        // transfer content to html
        $(".city").html("<h2>" + response.name + " " + currentDay + " " + image);
        // convert temp to degrees F
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        $(".temp").text("Temperature (F): " + tempF.toFixed(2) + "F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    });
}

function getCurrentForecast() {



}
        // save storage
        // function to add to list
        // add a div for each day, in a function


    });


});
