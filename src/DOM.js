import { GetCurrentConditions, GetHourlyReport, GetDailyReport, getWeatherData } from "./api.js";
const input = document.getElementById("location");
const submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let requestedLocation = input.value;
    let weatherData = getWeatherData(requestedLocation);
    console.log(GetCurrentConditions(weatherData));
    console.log(GetHourlyReport(weatherData));
    console.log(GetDailyReport(weatherData));
});