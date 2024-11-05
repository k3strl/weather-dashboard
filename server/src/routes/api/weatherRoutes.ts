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
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  // TODO: Call history service.getHistory(?) and return the data we want.
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  // TODO: call historyService.removeCity with the city name that was passed in the route parameter
});

export default router;
