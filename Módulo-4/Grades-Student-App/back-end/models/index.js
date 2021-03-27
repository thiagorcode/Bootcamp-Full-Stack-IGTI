import mongoose from 'mongoose';
import gradesModel from './gradesModel.js'


const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.Schema = gradesModel(mongoose)


//

export { db };
