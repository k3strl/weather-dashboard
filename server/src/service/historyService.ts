import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';


// Define a City class with name and id properties
class City {
  cityName: string;
  id: string; // UUID?

  constructor(cityName: string, id: string) {
    this.cityName = cityName;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    // dump entire array to the searchHistory.json file, overwrting existing contents
    return await fs.writeFile('searchHistory.json', JSON.stringify(cities, null, '\t'));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    // read()
    // return()
    return await this.read().then ((cities) => {
      let parsedCities: City[];
      // If states isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }
      return parsedCities;
    });
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    // read()
    // append city to array
    // write()
    if (!city) {
      throw new Error('search cannot be blank');
    }
    // Add a unique id to the state using uuid package
    const newCity: City = { cityName: city, id: uuidv4() };

    // Get all cities, add the new city, write all the updated cities, return the newCity
    return await this.getCities()
      .then((cities) => {
        if (cities.find((index) => index.cityName === city)) {
          return cities;
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    // read()
    // remove city from array by ID
    // write()
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
