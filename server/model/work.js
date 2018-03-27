import mongoose from 'mongoose'
import workTypes from './work-types'
import { Series, Contents } from './'

const Schema = mongoose.Schema

const Work = new Schema({
  id: { type: String, required: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: workTypes },
  creationTime: { type: Date, default: Date.now() },
  owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  series: { type: Schema.Types.ObjectId, ref: 'series', required: true },
  contents: { type: Schema.Types.ObjectId, ref: 'contents', required: true },
  awesomes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  isPublished: { type: Boolean, default: false }
})

Work.index({ id: 1, series: 1 }, { unique: true })

Work.post('save', work => {
  return Series.findById(work.series)
              .then(series => series.update({$push: { works: work }}))
})

Work.post('remove', work => {
  return Contents.findById(work.contents).remove()
                .then(() => Series.findById(work.series))
                .then(series => series.update({$pull: { works: work._id }}))
})

export default mongoose.model('work', Work)