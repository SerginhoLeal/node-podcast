import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface IListener extends mongoose.Document {
  name?:string,
  nickname?:string,
  password?:string,
  contact?:string
}

const ListenerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  contact: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

ListenerSchema.pre<IListener>('save', async function (next) {
  const hashPass = await bcrypt.hash(this.password, 10)
  this.password = hashPass
  next()
})

export default mongoose.model<IListener>('Listener', ListenerSchema)
