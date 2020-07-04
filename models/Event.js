import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
  },
  registered: {
    type: Array,
  },
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)