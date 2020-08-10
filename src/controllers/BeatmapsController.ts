import { Request, Response } from 'express';
import moment from 'moment';

import Mongo from '../database/Mongo';
import BeatmapModel from '../database/models/Beatmap';
import Beatmap from '../interfaces/IBeatmap';
import api from '../services/api';

class BeatmapsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const beatmaps = await Mongo.findAll(BeatmapModel);

    return response.send(beatmaps);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    // const beatmaps = request.body.beatmaps as Beatmap[];
    // const beatmaps = require('../database/maps.json');
    // const savedBeatmaps = await Mongo.save(BeatmapModel, beatmaps.beatmaps);

    const beatmaps = await Mongo.findAll(BeatmapModel);

    beatmaps.sort((a, b) => moment(b.approved_date).diff(a.approved_date));
    const since =
      beatmaps.length > 0 ? beatmaps[0].approved_date : '2000-01-01';

    const { data: newBeatmaps } = await api.get('', {
      params: {
        k: process.env.osu_apikey,
        since,
        m: 3,
      },
    });

    const savedBeatmaps = await Mongo.save(BeatmapModel, newBeatmaps);

    return response.json({
      isUpToDate: newBeatmaps.length < 500,
      savedBeatmaps,
    });
  }
}

export default BeatmapsController;
