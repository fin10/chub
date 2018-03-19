import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Work = new Schema({
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ['novel', 'poetry'] },
    creationTime: { type: Date, default: Date.now() },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: { type: Schema.Types.ObjectId, ref: 'contents', required: true },
    awesomes: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

export default mongoose.model('work', Work)