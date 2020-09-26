$(document).ready(function () {

    var cities = [];
    var apiKey = "69ae837f8b98c772b7dc3338e1b59cd3";
    var currentDay = moment().format('L');
    var city = $("#city-name").val().trim();

displaySearch();

    // when the search btuton is clicked
    $("#button-addon2").on("click", function (event) {
        event.preventDefault();
    
        // Declare Variables
        var city = $("#city-name").val().trim();
    
        // Update Search History
        cities.push(city);

        // Function calls
        getCurrentConditions();
        getCurrentForecast();
        renderButtons();
        storeCities();
    });
   
    function storeCities(){
        localStorage.setItem("weather", JSON.stringify(cities)); 
    }

   // when saved city button is clicked, run these two functions
   $(".city-btn").on("click", function (event) {
    event.preventDefault();
    getCurrentConditions()
    getCurrentForecast()
});

    function renderButtons() {
        var btn = $("<button>");
        var city = $("#city-name").val().trim();
        btn.addClass("btn btn-outline-secondary city-btn").css("display", "block",);
        btn.attr("data-name", city);
        btn.text(city);
        $(".cities-view").prepend(btn);

        listClicker();
    }

    function listClicker() {
        $(".city-btn").on("click", function(event){
            event.preventDefault();
            console.log("hello?");
            getCurrentConditions();
            getCurrentForecast();
        })
    }

    // display the searched city
    function displaySearch() {
        console.log(cities);
        var savedCities = JSON.parse(localStorage.getItem("cities"));
        console.log(savedCities)

        for (var i = 0; i < cities.length; i++) {
            var cityName = $("<button>");
            cityName.addClass("btn btn-outline-secondary city-btn");
            cityName.attr(cities[i]);
            cityName.text(cities[i]);
            $(".cities-view").append(cityName);
        }
    }

    // clears search history
    $("#clearBtn").on("click", function () {
        $(".cities-view").empty();
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
        }).then(function (response) {
            console.log(response);

            // Adds the icon image to the html
            $("#cityWeatherIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            // transfer content to html
            $(".city").html("<h2>" + response.name + " " + currentDay);
            $(".date").html("<h2>" + currentDay)
            // convert temp to degrees F
            var tempF = (response.main.temp - 273.15) * 1.8 + 32;
            $(".temp").text("Temperature (°F): " + tempF.toFixed(2) + "°F");
            $(".humidity").text("Humidity: " + response.main.humidity + "%");
            $(".wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");

            // get UV index
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $(".UVindex").empty();
                // value is the ultraviolet index
                var uvIndex = response.value;
                var color = "green";
                if (uvIndex > 10) {
                    color = "red";
                }
                else if (uvIndex > 4) {
                    color = "orange";
                };

                var uvSpan = $("<span>").text("UV Index: " + uvIndex).css("background-color", color)
                $(".UVindex").append(uvSpan);
            });
        });
    }

    function getCurrentForecast() {

        var city = $("#city-name").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.list);
            // empty forecast div, otherwise the last city will still show
            $("#forecast").empty();
            // loop through for 3pm
            for (var i = 0; i < response.list.length; i++) {
                // time is in dt_txt
                if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    // if 3pm, create a new card and card body
                    var newCard = $("<div>").attr("class", "card col-sm-4 col-md-2 fiveDay")
                    var cardBody = $("<div>").attr("class", "card-body");

                    var temperatureF = ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2);;

                    var date = $("<h4>").text(moment(response.list[i].dt, "X").format('l'));
                    var img = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                    var dailyTemp = $("<p>").text("Temp: " + temperatureF + "°F");
                    var humidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");

                    // append each new tag to the card body
                    cardBody.append(date, img, dailyTemp, humidity);
                    // append the card body to the card
                    newCard.append(cardBody);
                    // append the entire card to the forecast div
                    $("#forecast").append(newCard);
                }
            }
        });

    }

})