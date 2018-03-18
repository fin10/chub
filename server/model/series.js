import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Series = new Schema({
    title: String,
    description: { type: String, default: '' },
    creationTime: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
    works: { type: Array, default: [] },
    awesomes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    follows: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    folks: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

export default mongoose.model('series', Series)