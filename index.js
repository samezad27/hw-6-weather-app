var cityInput = $("#cityInput");
var searchButton = $("#searchButton");
var weather = {};
var apikey;

function cityInputValue() {
  return cityInput.val();
}

async function getApiKey() {
  var keyHash = "dY2UA0fTD_8azsRD7YFEg";
  var response = await fetch(
    `https://ljgvrb40q2.execute-api.us-west-2.amazonaws.com/dev/keyprr/${keyHash}`
  );
  var { data } = await response.json();
  apikey = data;
}

async function fetchCoordinates(search) {
  var response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apikey}`
  );
  var json = await response.json();
  if (!Boolean(json.length)) {
    alert("No results found");
    return [];
  }
  var location = json[0];
  return [location.lat, location.lon];
}

async function fetchWeather([lat, lng]) {
  var response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&appid=${apikey}&units=imperial`
  );

  var json = await response.json();

  return json;
}

function setLocalDate(utc) {
  return moment(
    moment
      .utc(utc * 1000)
      .local()
      .format("MM/DD/YYYY")
  )
    .local()
    .format("MM/DD/YYYY");
}

function setDailyWeather(weather, el) {
  $(`#day${el}`).find(".weatherDate")[0].innerHTML = setLocalDate(weather.dt);
  $(`#day${el}`).find(".weatherIcon")[0].innerHTML = "Enjoy!";
  $(`#day${el}`).find(
    ".weatherTemp"
  )[0].innerHTML = `Temp: ${weather.temp.day} F`;
  $(`#day${el}`).find(
    ".weatherWind"
  )[0].innerHTML = `Wind: ${weather.wind_speed} MPH`;
  $(`#day${el}`).find(
    ".weatherHumidity"
  )[0].innerHTML = `Humidity: ${weather.humidity} %`;
}

searchButton.click(async function () {
  var search = cityInputValue();
  if (!Boolean(search)) {
    alert("No city inputted");
    return;
  }

  var coordinates = await fetchCoordinates(search);
  weather = await fetchWeather(coordinates);
  var [day1, day2, day3, day4, day5, day6] = weather.daily;
  [day1, day2, day3, day4, day5, day6].forEach((day, i) => {
    setDailyWeather(day, i + 1);
  });
});

getApiKey();
