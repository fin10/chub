import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Contents = new Schema({
    contents: { type: String, default: '' },
})

export default mongoose.model('contents', Contents)