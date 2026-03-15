import { GetCurrentConditions, GetHourlyReport, GetDailyReport, getWeatherData } from "./api.js";
const input = document.getElementById("location");
const submitButton = document.getElementById("submit-btn");
const form = document.querySelector("form");

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    let requestedLocation = input.value;
    let weatherData = await getWeatherData(requestedLocation);
    console.log(GetCurrentConditions(weatherData));
    console.log(GetHourlyReport(weatherData));
    console.log(GetDailyReport(weatherData));
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
})