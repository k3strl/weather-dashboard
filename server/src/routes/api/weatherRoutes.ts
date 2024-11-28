import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
    // Call weather service.get(?) with the city name passed in the request
  // TODO: save city to search history
    // Call history service.save(?) with the city name if it is required
    try{
      let city = req.body.cityName
      const weatherData = WeatherService.getWeatherForCity(city)
      return weatherData
    }
    catch(error){
      return res.status(500).json(error)
    }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  // TODO: Call history service.getHistory(?) and return the data we want.
  try{
    let cities = await HistoryService.getCities()
    return res.status(200).json(cities)
  }
    catch(error){
      return res.status(500).json(error)
    }

});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, res: Response) => {
  // TODO: call historyService.removeCity with the city name that was passed in the route parameter
  res.json({message:"delete"})
});

export default router;
