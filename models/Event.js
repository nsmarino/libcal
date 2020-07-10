import mongoose from 'mongoose'

const patronSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  email: String,
  libraryCard: String,
})

const dateSchema = new mongoose.Schema({
  day: Number,
  month: Number,
  year: Number,
})
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dates: {
    type: [dateSchema],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  registered: [patronSchema],
})

EventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)