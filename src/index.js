import "./styles.css";

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QXFQ32SYB6Y32T7ABNSDCUC3V`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (error) {
    console.error(error);
  }
}

getWeatherData("tokyo");
