const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  passwordHash: String,
})

adminSchema.plugin(uniqueValidator)

adminSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema)