import mongoose from 'mongoose';

import podcastModel from './podcastModel.js';

const db = {};

db.url = process.env.MONGOURL;
db.mongoose = mongoose;
db.podcast = podcastModel(mongoose);

export { db };
