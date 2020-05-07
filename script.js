var cities = [];
var apiKey = "40d5fe5a931b845401c21e91e7d7a4ef";
var currentDay = moment().subtract(10, 'days').calendar();


$(document).ready(function() {
// when search is clicked
$("#button-addon2").on("click", function(event) {

    // put everything below inside a function, and on click at the end calling those functions
    event.preventDefault();
    getCurrentConditions();
    getCurrentForecast();
});

function getCurrentConditions() {
    // show the 5 day forecast 
    $(".col-md-9").addClass("show");
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

        // grab weather icon
        var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
        // transfer content to html
        console.log(image)
        $(".city").html("<h2>" + response.name + " " + currentDay + " " + image);
        // convert temp to degrees F
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        $(".temp").text("Temperature (°F): " + tempF.toFixed(2) + "°F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    });
}

function getCurrentForecast() {
    var city = $("#city-name").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.list);
        // loop through for 3pm
        for (var i = 0; i < response.list.length; i++) {
            // time is in dt_txt
            if(response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                // if 3pm, create a new card and card body
                var newCard = $("<div>").attr("class", "card col-sm-4 col-md-2 fiveDay")
                var cardBody = $("<div>").attr("class", "card-body");
                
                var temperatureF = ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2);;

                // var date = 
                var img = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                var dailyTemp = $("<p>").text("Temp: " + temperatureF + "°F");
                var humidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");

                // append each new tag to the card body
                cardBody.append(img, dailyTemp, humidity);
                // append the card body to the card
                newCard.append(cardBody);
                // append the entire card to the forecast div
                $("#forecast").append(newCard);
            }
        }
    });


    // add a div for each day, in a function

}
        // save storage
        // function to add to list

});
