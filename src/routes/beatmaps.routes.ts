import { Router } from 'express';

import BeatmapsController from '../controllers/BeatmapsController';

const routes = Router();

const beatmapsController = new BeatmapsController();

routes.get('/', async (request, response) => {
  try {
    return await beatmapsController.show(request, response);
  } catch (err) {
    return response.json(err);
  }
});

routes.post('/', async (request, response) => {
  try {
    return await beatmapsController.store(request, response);
  } catch (err) {
    return response.json(err);
  }
});

export default routes;
