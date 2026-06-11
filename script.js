const apiKey = "3c343fec7e548ea3ed1402e11b3529f5";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&lang=de&units=metric&q=";

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }
  

  let data = await response.json();
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "img/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "img/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "img/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "img/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "img/mist.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  document.querySelector(".suggestions").innerHTML = "";
  checkWeather(searchBox.value);
});

async function showSuggestions(input) {
  let list = document.querySelector(".suggestions");

  if (input.length < 2) {
    list.innerHTML = "";
    return;
  }

  let url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&lang=de&appid=${apiKey}`;
  let response = await fetch(url);
  let cities = await response.json();

  list.innerHTML = "";
  cities.forEach((city) => {
    let li = document.createElement("li");
    li.textContent = `${city.name}, ${city.country}`;
    li.onclick = () => selectCity(city.name);
    list.appendChild(li);
  });
}

function selectCity(name) {
  document.querySelector(".search input").value = name;
  document.querySelector(".suggestions").innerHTML = "";
  checkWeather(name);
}

