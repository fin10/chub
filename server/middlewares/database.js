import mongoose from 'mongoose'

export default () => {
  mongoose.connection.on('error', () => {
    console.error.bind(console, 'connection error:')
  })

  mongoose.connection.once('open', () => { 
    console.log('mongodb is connected.')
    require('../model')
  })

  mongoose.connection.on('connected', function() {
    if (mongoose.connection.client.s.url.startsWith('mongodb+srv')) {
      mongoose.connection.db = mongoose.connection.client.db('chub');
    }
    
    console.log('Connection to MongoDB established.')
  })
  
  const url = process.env.MONGO_DB_URL
  console.debug('MongoDB: ', url)
  mongoose.connect(url)
}