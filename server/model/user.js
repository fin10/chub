import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema({
    id: String,
    username: String,
    creationTime: Number,
    email: { type: String, default: '' },
    photo: { type: String, default: '' },
    follows: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    series: [{type: Schema.Types.ObjectId, ref: 'series' }]
})

export default mongoose.model('user', User)