import dayjs from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// has a lat, lon, appid, name????
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
  // has a Coords object, name, weather data, maybe other stuff who knows
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number)
    {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  cityName = "";

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = "";
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    // buildGeocodeQuery()
    console.log(query)
    const response = await fetch(query)
    .then((res) => res.json())
    const data: Coordinates[] = response
    return data[0];
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    // Takes the location data and returns more different-er location data
    let {lat, lon} = locationData;
    const coordinates: Coordinates = {lat, lon};
    // i.e. strip off the stuff we don't need and return only the coords we do
    return coordinates;
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    // create a query for the geocode API using the cityName class member
    // when the request is returned, return that URL
    // make this a const
    const geoCodeQuery = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
    return geoCodeQuery;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    return weatherQuery;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    // make the API call using the baseURL and GeoLoc API information
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    
    // destructureLocationData(data)
    return this.destructureLocationData(locationData)
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    const data = await response.json();
    const currentWeather = this.parseCurrentWeather(data);
    const forecast = this.buildForecastArray(currentWeather, data.list);
    return { currentWeather, forecast };
  }
  // parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const currentDate = dayjs.unix(response.dt).format('M/D/YYYY');
    const currentWeather = new Weather(
      this.cityName,
      currentDate,
      response.weather[0].icon,
      response.weather[0].description,
      response.main.temp,
      response.wind.speed,
      response.main.humidity
    );
    return currentWeather;
  }
  // buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = weatherData.map((data: any) => {
      const date = dayjs.unix(data.dt).format('M/D/YYYY');
      return new Weather(
        this.cityName,
        date,
        data.weather[0].icon,
        data.weather[0].description,
        data.main.temp,
        data.wind.speed,
        data.main.humidity
      );
    });
    return forecastArray;
  }
  // Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try{
      this.cityName = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      if (coordinates){
        const weather = await this.fetchWeatherData(coordinates);
        return weather;
      }
      throw new Error('Weather data not found.') 
    }
    catch(error){
      console.error(error)
      throw error;
    } 
  }
    // this.cityName = city;
    // let coordinates = await this.fetchAndDestructureLocationData();
    // console.log(coordinates);
    // set the cityName member if it's not already set
    // fetchLocationData()
    // fetchWeatherData()

    // return [todaysWeather, tomorrowsWeather, etc]

}

export default new WeatherService();
