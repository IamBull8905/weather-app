function GetCurrentConditions(weatherData) {
  const currentWeather = weatherData.currentConditions;
  const conditions = currentWeather.conditions;
  const feelsLike = currentWeather.feelslike;
  const humidity = currentWeather.humidity;
  const precipitationChance = currentWeather.precipprob;
  const sunrise = currentWeather.sunrise;
  const sunset = currentWeather.sunset;
  const temperature = currentWeather.temp;
  const wind = currentWeather.windspeed;
  return {
    conditions,
    feelsLike,
    humidity,
    precipitationChance,
    sunrise,
    sunset,
    temperature,
    wind,
  };
}

function GetHourlyReport(weatherData) {
  const todayHours = weatherData.days[0].hours;
  const displayHours = [];
  for (const hour of todayHours) {
    const conditions = hour.conditions;
    const time = hour.datetime;
    const feelsLike = hour.feelslike;
    const humidity = hour.humidity;
    const precipitationChance = hour.precipprob;
    const temperature = hour.temp;
    const wind = hour.windspeed;
    const hourData = {
      conditions,
      time,
      feelsLike,
      humidity,
      precipitationChance,
      temperature,
      wind,
    };
    displayHours.push(hourData);
  }
  return displayHours;
}

function GetDailyReport(weatherData) {
  const allDays = weatherData.days;
  const displayDays = [];
  for (const day of allDays) {
    const conditions = day.conditions;
    const date = day.datetime;
    const description = day.description;
    const sunrise = day.sunrise;
    const sunset = day.sunset;
    const maxTemp = day.tempmax;
    const minTemp = day.tempmin;
    const dayData = {
      conditions,
      date,
      description,
      sunrise,
      sunset,
      maxTemp,
      minTemp,
    };
    displayDays.push(dayData);
  }
  return displayDays;
}

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QXFQ32SYB6Y32T7ABNSDCUC3V`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
    console.log(GetCurrentConditions(weatherData));
    console.log(GetHourlyReport(weatherData));
    console.log(GetDailyReport(weatherData));
  } catch (error) {
    console.error(error);
  }
}

export {
  GetCurrentConditions,
  GetHourlyReport,
  GetDailyReport,
  getWeatherData,
};
