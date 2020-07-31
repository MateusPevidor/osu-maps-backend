import mongoose from 'mongoose';

import BeatmapSchema from '../schemas/Beatmap';

interface beatmap extends mongoose.Document {
  diffSize: string;
}

const BeatmapModel = mongoose.model<beatmap>('Beatmap', BeatmapSchema);

export default BeatmapModel;
