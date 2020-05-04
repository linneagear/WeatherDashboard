var cities = ["Phoenix", "London", "Ney York City"];
var apiKey = "40d5fe5a931b845401c21e91e7d7a4ef";


// displayWeatherInfo function re-renders the HTML to display the appropriate content
$("#button-addon2").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-name").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        


        
    });
    });