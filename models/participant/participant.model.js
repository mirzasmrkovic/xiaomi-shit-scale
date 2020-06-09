import mongoose from 'mongoose'

const effortSchema = new mongoose.Schema(
  {
    score: Number
  },
  { timestamps: true }
)

const participantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  efforts: [effortSchema]
})

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

participantSchema.pre('save', function (next) {
  const participant = this
  if (!participant.isModified('password')) return next()
  bcrypt.genSalt(12, function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(participant.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      participant.password = hash
      next()
    })
  })
})

participantSchema.methods.checkPassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

export const Participant = mongoose.model('participant', participantSchema)
