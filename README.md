# WeatherDashboard
HW 6 - Weather Dashboard

# 06 Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```


# Psuedo Code
- when I click search, the city name value will appear in the list group class, and all the data will be appended to the cityInformation div
- when click search, also shows the 5 day forecast
- each time something is searched, it is saved
- list items are also buttons, so you can go back
- if UV index <= 2, favorable/green
- if UV index >2 and <=5, moderate/yellow
- if UV index >5, high/red
- function to Save each city in local storage
- function to create list items and then render buttons for those list items, then put these inside the click function
- have separate ajax for uv value
- another function to get the full forecast
- initiliaze by get item local storage


# Technology used
moment.js
jQuery
font awesome
bootstrap
weather api
