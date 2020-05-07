var $searchForm = $("#search-form");
var $searchInput = $("#search-input");
var $searchedCities = $("#searched-cities");
var $cityResults = $("#city-results");
var currentDay = $(".currentDay");

// todays date
var today = (moment().format('MMMM Do YYYY'));

var cities = [];
// push variables to corresponding cards
function printArr(weatherArr, cityName) {
  for (var i = 0; i < weatherArr.length; i++) {

    var $card = $('<div>').addClass('card bg-light text-dark mb-3');

    var $cardBody = $('<div>').addClass('card-body');
    $cardBody
      .append(`<p>Date: ${weatherArr[i].dt_txt}</p>`)
      .append(`<p>Temperature (F): ${weatherArr[i].main.temp}</p>`)
      .append(`<p>Weather: ${weatherArr[i].weather[0].main}</p>`)
      .append(`<p>Wind: ${weatherArr[i].wind.speed}</p>`);

    $card.append($cardBody);

    $cityResults.append($card);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  var searchTerm = $searchInput.val();
// restrict searches to zip code?
  if (!searchTerm) {
    return false;
  }

  // https://medium.com/netscape/hacking-it-out-when-cors-wont-let-you-be-great-35f6206cc646


  var queryURLOne = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=bb2771f5bb681a2a7b1c9f5f413832a1&units=imperial`;

  $.ajax({
    url: queryURLOne,
    method: "GET"
  }).then(function (response) {

    $(".city").html("<h1>" + response.name + "</h1>");
    $(".currentDay").text(today);
    $(".description").text(
      "Weather: " + response.weather[0].description
    );
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F): " + response.main.temp);
    $(".wind").text("Wind Speed: " + response.wind.speed);

    printArr()
  });

  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=bb2771f5bb681a2a7b1c9f5f413832a1&units=imperial`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var fiveDayArr = response.list.filter(function (weatherObj) {
      if (weatherObj.dt_txt.includes('12:00:00')) {
        return true;
      }
      else {
        return false;
      };

    });

    printArr(fiveDayArr);
  });
}
;
$searchForm.on("submit", handleFormSubmit);