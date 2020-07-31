import mongoose, { FilterQuery } from 'mongoose';

interface Beatmap {
  beatmapset_id: string; // eslint-disable-line
  difficultyrating: number;
}

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
    const newData = await model.create(data);
    return newData;
  }
}

export default new Mongo();
