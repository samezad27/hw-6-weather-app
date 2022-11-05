var cityInput = $("#cityInput");
var searchButton = $("#searchButton");
var apikey;

async function cityInputValue() {
  const value = await fetchCoordinates();
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

async function fetchCoordinates() {
  var response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apikey}`
  );
  var json = await response.json();
  if (!Boolean(json.length)) {

  }
  console.log(json);
}

searchButton.click(async function () {
  if (!Boolean(cityInputValue())) {
    alert("No city inputted");
    return;
  }
 
  console.log("value set");
});

getApiKey();
