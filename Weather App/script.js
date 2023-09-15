document.addEventListener("DOMContentLoaded", () => {
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("wind-speed");
    const precipitationElement = document.getElementById("precipitation");
    const cloudCoverElement = document.getElementById("cloud-cover");
    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const weatherInfo = document.querySelector(".weather-info");

    function fetchWeatherData(city) {
        // Replace 'YOUR_API_KEY' with your WeatherAPI.com API key
        const apiKey = "e24b171ff531469d9c8203122231009 ";

        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
            .then(response => response.json())
            .then(data => {
                const cityName = data.location.name;
                const temperature = data.current.temp_c;
                const humidity = data.current.humidity;
                const windSpeed = data.current.wind_kph;
                const precipitation = data.current.precip_mm;
                const cloudCover = data.current.cloud;

                locationElement.textContent = `Location: ${cityName}`;
                temperatureElement.textContent = `${temperature}`;
                humidityElement.textContent = `${humidity}`;
                windSpeedElement.textContent = `${windSpeed}`;
                precipitationElement.textContent = `${precipitation} mm`;
                cloudCoverElement.textContent = `${cloudCover}%`;

                // Add the 'show' class after data is fetched
                weatherInfo.classList.add("show");
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                locationElement.textContent = "Error fetching weather data.";
            });
    }

    function handleSearch() {
        const city = cityInput.value;
        if (city) {
            // Remove the 'show' class before fetching new data
            weatherInfo.classList.remove("show");
            fetchWeatherData(city);
        } else {
            alert("Please enter a city name.");
        }
    }

    searchButton.addEventListener("click", handleSearch);
    cityInput.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    // Optionally, you can fetch the weather for a default city on page load
    // fetchWeatherData("DefaultCityName");
});
