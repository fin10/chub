import mongoose from 'mongoose'
import workTypes from './work-types'

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

export default mongoose.model('work', Work)