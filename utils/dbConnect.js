import mongoose from 'mongoose'
import { MONGODB_URI } from '../utils/config'

const connection = {} /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our database*/
  if (connection.isConnected) {
    return
  }
  /* connecting to our database */
  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect