import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Series = new Schema({
    id: { type: String, required: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    creationTime: { type: Date, default: Date.now() },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    awesomes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    follows: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    folks: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

Series.index({ id: 1, owner: 1 }, { unique: true })

export default mongoose.model('series', Series)