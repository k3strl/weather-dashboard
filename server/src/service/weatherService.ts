import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// has a lat, lon, appid, name????
interface Coordinates {
  lat: number;
  lon: number;
  appid: string;
  name: string;
}
// TODO: Define a class for the Weather object
  // has a Coords object, name, weather data, maybe other stuff who knows
class Weather {
  coords: Coordinates;
  name: string;
  weather: any;
  constructor(coords: Coordinates, name: string, weather: any) {
    this.coords = coords;
    this.name = name;
    this.weather = weather;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL = "";
  apiKey = "";
  cityName = "";
  coords = Coordinates = GeolocationCoordinates
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    // buildGeocodeQuery()

  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    // Takes the location data and returns more different-er location data
    // i.e. strip off the stuff we don't need and return only the coords we do
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    // create a query for the geocode API using the cityName class member
    // when the request is returned, return that URL
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    // make the API call using the baseURL and GeoLoc API information
    // destructureLocationData(data)
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    // buildWeatherQuery()
    // make weather API call
    // parsecurrentWeather()
    // buildForecastArray()
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    // TODO: take the response object and return just the weather object we care about
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    // take 5-day forecast weather object and return just the forecast obejcts we care about
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    // set the cityName member if it's not already set
    // fetchLocationData()
    // fetchWeatherData()

    // return [todaysWeather, tomorrowsWeather, etc]
  }

}

export default new WeatherService();
