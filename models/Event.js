import mongoose from 'mongoose'

const PatronSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  libraryCard: {
    type: String,
    required: true,
  },
})

const FormDataSchema = new mongoose.Schema({
  carmelOnly: Boolean,
  classSize: String,
  description: String,
  endAfter: String,
  endDate: String,
  endTime: String,
  endType: String,
  interval: String,
  weeklyInterval: String,
  sunday: Boolean,
  monday: Boolean,
  tuesday: Boolean,
  wednesday: Boolean,
  thursday: Boolean,
  friday: Boolean,
  saturday: Boolean,
  monthlyInterval: String,
  monthlyType: String,
  numberedDay: String,
  ordinalOfMonth: String,
  ordinalOfWeek: String,
  recurrenceType: String,
  recurring: Boolean,
  registrationRequired: Boolean,
  startDate: String,
  startTime: String,
  title: String,   
})

const dateSchema = new mongoose.Schema({
  day: Number,
  month: Number,
  year: Number,
})
const EventSchema = new mongoose.Schema({
  dates: {
    type: [dateSchema],
    required: true,
  },
  registered: [PatronSchema],
  formData: FormDataSchema,
})

EventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)

// import mongoose from 'mongoose'

// const PatronSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   libraryCard: {
//     type: String,
//     required: true,
//   },
// })

// const dateSchema = new mongoose.Schema({
//   day: Number,
//   month: Number,
//   year: Number,
// })
// const EventSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   dates: {
//     type: [dateSchema],
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   registered: [PatronSchema],
// })

// EventSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)