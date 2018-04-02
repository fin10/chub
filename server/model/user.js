import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema({
    id: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, trim: true },
    creationTime: { type: Date, default: Date.now() },
    email: { type: String, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ },
    photo: { type: String },
    follows: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    series: [{type: Schema.Types.ObjectId, ref: 'series' }]
})

export default mongoose.model('user', User)