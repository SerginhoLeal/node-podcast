import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface ICreator extends mongoose.Document {
  name?:string,
  nickname?:string,
  password?:string,
  contact?:string,
  cpf?:number
}

const CreatorSchema = new mongoose.Schema({
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
  },
  cpf: {
    type: Number,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

CreatorSchema.pre<ICreator>('save', async function (next) {
  const hashPass = await bcrypt.hash(this.password, 10)
  this.password = hashPass
  next()
})

export default mongoose.model<ICreator>('Creator', CreatorSchema)
