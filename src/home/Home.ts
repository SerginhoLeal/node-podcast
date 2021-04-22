import mongoose, { Schema, Document } from 'mongoose'
import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const s3 = new aws.S3()

interface IHome extends Document {
  title:string,
  artist:string,
  creator:Object,
  category:string,
  key:string,
  artwork:string,
  url:string,
  id:string,
  views:string
}

const HomeSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  artist: {
    type: String,
    require: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    require: true
  },
  category: {
    type: String,
    require: true
  },
  key: String,
  artwork: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  id: {
    type: String,
    require: true,
    unique: true
  },
  views: []
}, {
  timestamps: true
})

// eslint-disable-next-line space-before-function-paren
HomeSchema.pre<IHome>('save', function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
})

// eslint-disable-next-line space-before-function-paren
HomeSchema.pre<IHome>('remove', function() {
  if (process.env.STORAGE_TYPE === 's3') {
    return s3.deleteObject({
      Bucket: 'azdq8fpodcast',
      Key: this.key
    }).promise()
  } else {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
  }
})

export default mongoose.model<IHome>('Home', HomeSchema)
