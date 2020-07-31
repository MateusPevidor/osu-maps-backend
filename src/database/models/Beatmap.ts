import mongoose from 'mongoose';

import BeatmapSchema from '../schemas/Beatmap';

const BeatmapModel = mongoose.model('Beatmap', BeatmapSchema);

export default BeatmapModel;
