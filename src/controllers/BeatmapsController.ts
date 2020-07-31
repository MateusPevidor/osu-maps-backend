import { Request, Response } from 'express';

import Mongo from '../database/Mongo';
import BeatmapModel from '../database/models/Beatmap';

interface GroupedBeatmapArray {
  [index: string]: {
    difficultyRating: number;
  };
}

class BeatmapsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const beatmaps = await Mongo.findAll(BeatmapModel);

    let groupedBeatmaps: GroupedBeatmapArray;
    beatmaps.forEach(beatmap => {
      groupedBeatmaps[beatmap.beatmapset_id] = {
        difficultyRating: beatmap.difficultyrating,
      };
    });

    return response.send(beatmaps);
  }
}

export default BeatmapsController;
