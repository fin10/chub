import mongoose from 'mongoose'

export default () => {
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => { console.log('mongodb is connected.') });
  mongoose.connect('mongodb://' + process.env.MONGO_DB_HOST + '/chub')
}