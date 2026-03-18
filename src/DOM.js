import {
  GetCurrentConditions,
  GetHourlyReport,
  GetDailyReport,
  getWeatherData,
} from "./api.js";
import { format, parse } from "date-fns";
const input = document.getElementById("location");
const submitButton = document.getElementById("submit-btn");
const form = document.querySelector("form");
const heroGif = document.querySelector(".hero-gif");
const currentCondition = document.getElementById("current-condition");
const currentFeelsLike = document.getElementById("current-fl");
const currentHumidity = document.getElementById("current-humidity");
const currentPrecipChance = document.getElementById("current-chance");
const currentSunrise = document.getElementById("current-sunrise");
const currentSunset = document.getElementById("current-sunset");
const currentTemp = document.getElementById("current-temp");
const currentWindspeed = document.getElementById("current-windspeed");
const toggleHours = document.getElementById("toggle-hours");
const hoursContainer = document.querySelector(".hours-container");
const daysContainer = document.querySelector(".days-container");
const unitConverter = document.getElementById("unit-converter");
let hourlyData = null;
let dailyData = null;
let hoursChanger = false; // false when low, true when high
let unit = "us";

function formatDate(date) {
  const parsedDate = parse(date, `yyyy-MM-dd`, new Date());
  const result = format(parsedDate, "dd/MM/yyyy");
  return result;
}

async function getIconSource(iconName) {
  if (iconName === "snow") {
    return (await import(`./images-and-icons/snowy.png`)).default;
  } else if (iconName === "rain") {
    return (await import(`./images-and-icons/rain.png`)).default;
  } else if (iconName === "fog") {
    return (await import(`./images-and-icons/fog.png`)).default;
  } else if (iconName === "wind") {
    return (await import(`./images-and-icons/wind.png`)).default;
  } else if (iconName === "cloudy") {
    return (await import(`./images-and-icons/clouds.png`)).default;
  } else if (iconName === "partly-cloudy-day") {
    return (await import(`./images-and-icons/summer.png`)).default;
  } else if (iconName === "partly-cloudy-night") {
    return (await import(`./images-and-icons/night.png`)).default;
  } else if (iconName === "clear-day") {
    return (await import(`./images-and-icons/sun.png`)).default;
  } else {
    return (await import(`./images-and-icons/moon.png`)).default;
  }
}

async function generateLowHourCards(hourlyData) {
  hoursContainer.textContent = "";
  for (let i = 0; i < 12; i++) {
    const card = document.createElement("div");
    card.classList.add("hour-card");
    const timeShown = document.createElement("p");
    timeShown.classList.add("important-text");
    timeShown.classList.add("hour-time");
    timeShown.textContent = hourlyData[i].time;
    const conditions = document.createElement("img");
    let chosenIcon = hourlyData[i].icon;
    conditions.src = await getIconSource(chosenIcon);
    const feelsLike = document.createElement("p");
    feelsLike.classList.add("supplement-text");
    feelsLike.textContent = `Feels Like: ${hourlyData[i].feelsLike}`;
    const humidity = document.createElement("p");
    humidity.classList.add("supplement-text");
    humidity.textContent = `Humidity: ${hourlyData[i].humidity}`;
    const precipChance = document.createElement("p");
    precipChance.classList.add("important-text");
    precipChance.textContent = `💦 (%): ${hourlyData[i].precipitationChance}`;
    const temperature = document.createElement("p");
    temperature.classList.add("important-text");
    temperature.textContent = `☀️: ${hourlyData[i].temperature}`;
    const windspeed = document.createElement("p");
    windspeed.classList.add("supplement-text");
    windspeed.textContent = `🍃: ${hourlyData[i].wind}`;
    card.append(timeShown);
    card.append(conditions);
    card.append(feelsLike);
    card.append(humidity);
    card.append(precipChance);
    card.append(temperature);
    card.append(windspeed);
    hoursContainer.append(card);
  }
}

async function generateHighHourCards(hourlyData) {
  hoursContainer.textContent = "";
  for (let i = 12; i < 24; i++) {
    const card = document.createElement("div");
    card.classList.add("hour-card");
    const timeShown = document.createElement("p");
    timeShown.classList.add("important-text");
    timeShown.classList.add("hour-time");
    timeShown.textContent = hourlyData[i].time;
    const conditions = document.createElement("img");
    let chosenIcon = hourlyData[i].icon;
    conditions.src = await getIconSource(chosenIcon);
    const feelsLike = document.createElement("p");
    feelsLike.classList.add("supplement-text");
    feelsLike.textContent = `Feels Like: ${hourlyData[i].feelsLike}`;
    const humidity = document.createElement("p");
    humidity.classList.add("supplement-text");
    humidity.textContent = `Humidity: ${hourlyData[i].humidity}`;
    const precipChance = document.createElement("p");
    precipChance.classList.add("important-text");
    precipChance.textContent = `💦 (%): ${hourlyData[i].precipitationChance}`;
    const temperature = document.createElement("p");
    temperature.classList.add("important-text");
    temperature.textContent = `☀️: ${hourlyData[i].temperature}`;
    const windspeed = document.createElement("p");
    windspeed.classList.add("supplement-text");
    windspeed.textContent = `🍃: ${hourlyData[i].wind}`;
    card.append(timeShown);
    card.append(conditions);
    card.append(feelsLike);
    card.append(humidity);
    card.append(precipChance);
    card.append(temperature);
    card.append(windspeed);
    hoursContainer.append(card);
  }
}

async function generateDayCards(dailyData) {
  for (const day of dailyData) {
    const dayCard = document.createElement("div");
    dayCard.classList.add("day-card");
    const conditions = document.createElement("img");
    conditions.src = await getIconSource(day.icon);
    const newDate = document.createElement("p");
    newDate.classList.add("important-text");
    newDate.textContent = formatDate(day.date);
    const description = document.createElement("p");
    description.classList.add("supplement-text");
    description.textContent = day.description;
    const maxTemperature = document.createElement("p");
    maxTemperature.classList.add("important-text");
    maxTemperature.textContent = `High: ${day.maxTemp}`;
    const minTemperature = document.createElement("p");
    minTemperature.classList.add("supplement-text");
    minTemperature.textContent = `Low: ${day.minTemp}`;
    const sunrise = document.createElement("p");
    sunrise.classList.add("supplement-text");
    sunrise.textContent = `Sunrise: ${day.sunrise}`;
    const sunset = document.createElement("p");
    sunset.classList.add("supplement-text");
    sunset.textContent = `Sunset: ${day.sunset}`;
    dayCard.append(conditions);
    dayCard.append(newDate);
    dayCard.append(description);
    dayCard.append(maxTemperature);
    dayCard.append(minTemperature);
    dayCard.append(sunrise);
    dayCard.append(sunset);
    daysContainer.append(dayCard);
  }
}

toggleHours.addEventListener("click", () => {
  if (hoursChanger === false) {
    generateHighHourCards(hourlyData);
    hoursChanger = true;
    toggleHours.textContent = "Previous 12 hours";
  } else {
    generateLowHourCards(hourlyData);
    hoursChanger = false;
    toggleHours.textContent = "Next 12 hours";
  }
});

unitConverter.addEventListener("click", () => {
  if (unit === "us") {
    unit = "metric";
    unitConverter.textContent = "Celsius to Fahrenheit";
  } else {
    unit = "us";
    unitConverter.textContent = "Fahrenheit to Celsius";
  }
  if (input.value) {
    submitButton.click();
  }
});

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  let requestedLocation = input.value;
  let weatherData = await getWeatherData(requestedLocation, unit);
  let currentConditions = GetCurrentConditions(weatherData);
  console.log(currentConditions);
  currentCondition.textContent = `Conditions: ${currentConditions.conditions}`;
  currentFeelsLike.textContent = `Feels like: ${currentConditions.feelsLike}`;
  currentHumidity.textContent = `Humidity: ${currentConditions.humidity}`;
  currentPrecipChance.textContent = `Precipitation Chance: ${currentConditions.precipitationChance}%`;
  currentSunrise.textContent = `Sunrise: ${currentConditions.sunrise}`;
  currentSunset.textContent = `Sunset: ${currentConditions.sunset}`;
  currentTemp.textContent = `Temperature: ${currentConditions.temperature}`;
  currentWindspeed.textContent = `Windspeed: ${currentConditions.wind}`;
  let weatherGif = await import(
    `./images-and-icons/${currentConditions.icon}.gif`
  );
  heroGif.src = weatherGif.default;
  hourlyData = GetHourlyReport(weatherData);
  console.log(hourlyData);
  generateLowHourCards(hourlyData);
  dailyData = GetDailyReport(weatherData);
  console.log(dailyData);
  generateDayCards(dailyData);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
