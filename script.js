const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

// The API key is not included here for security reasons, since this is a public repository.
// If you want to test the app, please replace the apiKey variable with your own key.

// const apiKey = "Add your API Key here"; 
const weatherInfo = document.querySelector(".weather-info");


function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
       
      }
      return response.json();
    })
    .then(data => {
      const cityName = data.name;
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      
      weatherInfo.innerHTML = 
      `
      <h2> Weather in: ${cityName}</h2>
      <img src="${iconUrl}" alt="${description}" class="weather-icon">
      <p> <strong>Temperature:</strong> ${temp} °C </p>
      <p><strong>Conditions: <strong> ${description}</p>
      `
    })
    .catch(error => {
      console.error("Error - data not loaded:", error);
       weatherInfo.innerHTML =  `<h3 class = "error-msg"> Please enter a valid city `
    });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim(); 
  if (city) {
    getWeather(city);
  } else {
   weatherInfo.innerHTML = `<h3 class = "error-msg"> Please enter a name of a city `
  }
});
