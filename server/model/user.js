import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema({
    id: String,
    username: String
})

export default mongoose.model('user', User)