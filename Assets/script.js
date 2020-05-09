$(document).ready(function () {

    var cities = [];
    var apiKey = "40d5fe5a931b845401c21e91e7d7a4ef";
    var currentDay = moment().format('L');
    var city = $("#city-name").val().trim();
    // var searchHistory = localStorage.getItem("weather");
    // console.log(searchHistory);

    // when search is clicked
    $("#button-addon2").on("click", function (event) {
        event.preventDefault();

        var city = $("#city-name").val().trim();
        cities.push(city);

        $(".city").text(city)

        displaySearch();
        getCurrentConditions();
        getCurrentForecast();
        console.log(cities);
    });

    // function renderButtons() {
    //     // Deleting the cities prior to adding new cities
    //     // (this is necessary otherwise we will have repeat buttons)
    //     $(".cities-view").empty();

    //     for (var i = 0; i < cities.length; i++) {
    //         // create a button for each city
    //         var historyItem = $("<button>");
    //         var cityDiv = $("<div class='city2'>");
    //         historyItem.addClass("city2")

    //         historyItem.attr("data-name", cities[i]);

    //         historyItem.text(cities[i]);
    //         historyItem.append(cityDiv);
    //         $(".cities-view").append(historyItem);
    //     }
    // }

    $("#clearBtn").on("click", function (event) {
        $(".cities-view").empty();
    });

    // display the searched city
    function displaySearch(newCity) {
        $(".cities-view").empty();
        console.log(cities);
        localStorage.setItem("weather", JSON.stringify(cities))

        for (var i = 0; i < cities.length; i++) {
            var cityName = $("<button>");
            cityName.addClass("new-city-p");
            cityName.attr(cities[i]);
            cityName.text(cities[i]);
            $(".cities-view").append(cityName);
        }
    }

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
            console.log(response.weather);

            // grab weather icon
            var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png")
            console.log(response.weather[0]);
            // transfer content to html
            $(".city").html("<h2>" + response.name + " " + currentDay + " " + image);
            $(".date").html("<h2>" + currentDay + " " + image)
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

                var uvSpan = $("<span>").text("UV Index: " + uvIndex).css("color", color)
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

    $(".cities-view").on("click", ".new-city-p", function (event) {
        console.log(event.currentTarget.innerText);
        event.preventDefault();
        $(".city").text(event.currentTarget.innerText);
        getCurrentConditions(event.currentTarget.innerText);
        getCurrentForecast(event.currentTarget.innerText);
    })

})