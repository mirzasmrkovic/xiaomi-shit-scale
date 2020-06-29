import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const effortSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
      required: true
    },
    commence: {
      type: Number,
      required: true
    },
    conclude: Number,
    status: {
      type: String,
      enum: ['concluded', 'active'],
      default: 'active'
    },
    score: Number
  },
  { timestamps: true }
)

export const Effort = mongoose.model('Effort', effortSchema)
