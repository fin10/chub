import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema({
    id: String,
    username: String,
    email: { type: String, default: '' },
    photo: { type: String, default: '' },
    follows: { type: Array, default: [] }
})

export default mongoose.model('user', User)