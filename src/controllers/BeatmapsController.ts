import { Request, Response } from 'express';

import Mongo from '../database/Mongo';
import BeatmapModel from '../database/models/Beatmap';
import Beatmap from '../interfaces/IBeatmap';

class BeatmapsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const beatmaps = await Mongo.findAll(BeatmapModel);

    return response.send(beatmaps);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const beatmaps = request.body.beatmaps as Beatmap[];

    const savedBeatmaps = await Mongo.save(BeatmapModel, beatmaps);

    return response.json(savedBeatmaps);
  }
}

export default BeatmapsController;
