var submitButton = document.getElementById("submitBtn");

console.log(document.all);

var apiKey = "a798a2414f3d2a7ae306d566f277b6e5";

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    console.log(localStorage.getItem("City"));
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
}

var acceptUserInput = function(){
    var searchInput = document.getElementById('queryTarget').value;
    console.log(queryTarget.value);
    console.log(searchInput);

var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";


fetch(apiURL).then(function(response) {
    if (response.ok) {
        response.json().then(function(data){
            console.log(data)
        
        var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
        var currentName = currentCard.append("<p>");
            // .addClass("card-text");
            currentCard.append(currentName);

            // Adjust Date 
        var timeUTC = new Date(data.dt * 1000);
            currentName.append(data.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`);
            // Add Temp 
        var currentTemp = currentName.append("<p>");
            // .addClass("card-text");
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + data.main.temp + "</p>");
            // Add Humidity
            currentTemp.append("<p>" + "Humidity: " + data.main.humidity + "%" + "</p>");
            // // Add Wind Speed: 
            currentTemp.append("<p>" + "Wind Speed: " + data.wind.speed + "</p>");

        var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + data.name + "</li>");

        });
    } else {
        alert('Error');
    }
});

var forecastapiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

fetch(forecastapiURL).then(function(response) {
    if (response.ok) {
        response.json().then(function(data){
            console.log(data)

            var day = [0, 8, 16, 24, 32];
            var fiveDayCard = $(".fiveDayCard").addClass("card-body");
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();
            // For each for 5 days
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(data.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + data.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + data.list[i].main.humidity + "%" + "</p>" + "</div>");
        });    
    });
        } else {
        alert('Error');

        };
    });

};


submitButton.addEventListener("click", acceptUserInput);


