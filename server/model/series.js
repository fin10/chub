import mongoose from 'mongoose'

import { User } from './'

const Schema = mongoose.Schema

const Series = new Schema({
  id: { type: String, required: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  creationTime: { type: Date, default: Date.now() },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  tags: [{ type: String, trim: true, lowercase: true }],
  works: [{ type: Schema.Types.ObjectId, ref: 'work' }],
  awesomes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  follows: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  folks: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

Series.index({ id: 1, owner: 1 }, { unique: true })

Series.post('save', series => {
  return User.findById(series.owner)
      .then(user => user.update({$addToSet: { series: series }}))
      .then(() => series.populate('owner').execPopulate())
})

export default mongoose.model('series', Series)