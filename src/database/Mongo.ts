import mongoose from 'mongoose';
import Beatmap from '../interfaces/IBeatmap';

class Mongo {
  constructor() {
    console.log(process.env.MONGO_URL);
    mongoose
      .connect(process.env.MONGO_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('✅ Successfully connected to MongoDB!');
      })
      .catch(err => {
        console.log('❌ Failed to connect to MongoDB...');
        console.log(err);
      });
  }

  public async find(
    model: mongoose.Model<mongoose.Document, unknown>,
    query: any,
  ) {
    const data = await model.find(query);
    return data;
  }

  public findAll(
    model: mongoose.Model<mongoose.Document, unknown>,
  ): Promise<Beatmap[]> {
    return new Promise(resolve => {
      model.find((err, res: Beatmap[]) => {
        return resolve(res);
      });
    });
  }

  public async save(
    model: mongoose.Model<mongoose.Document, unknown>,
    data: any,
  ) {
    if (model.modelName === 'Beatmap') {
      const beatmaps = (
        await Promise.all(
          data.map(async (beatmap: Beatmap) => {
            return {
              beatmapExists: await model.findOne({
                beatmap_id: beatmap.beatmap_id,
              }),
              beatmap,
            };
          }),
        )
      )
        .filter((beatmap: any) => !beatmap.beatmapExists)
        .map((beatmap: any) => beatmap.beatmap);
      if (beatmaps.length > 0) {
        const createdBeatmaps = await model.create(beatmaps);
        return createdBeatmaps;
      }
      return null;
    }
    const newData = await model.create(data);
    return newData;
  }
}

export default new Mongo();
