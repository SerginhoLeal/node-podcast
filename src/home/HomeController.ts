import { Request, Response } from 'express'
import Home from './Home'
import aws from 'aws-sdk'

const s3 = new aws.S3()
export class HomeController {
  async index (req:any, res:Response): Promise<Response> {
    const { _limit } = req.headers
    const docs = await Home.find().sort({ createAt: -1 }).limit(Number(_limit))
    return res.json(docs)
  }

  async search (req:Request, res:Response): Promise<Response> {
    const docs = await Home.findById(req.params.id)
    return res.json(docs)
  }

  async create (req:any, res:Response): Promise<Response> {
    const { artist, title, category } = req.body
    const docs = await Home.find()
    try {
      const create = await Home.create({
        title,
        artist,
        creator: req.userId,
        key: req.file.key,
        category,
        file: {
          artwork: 'xxx',
          url: req.file.location,
          time: 3654
        },
        id: docs.length + 1
      })
      return res.json({ create })
    } catch (error) {
      if (process.env.STORAGE_TYPE === 's3') {
        s3.deleteObject({
          Bucket: 'azdq8fpodcast',
          Key: req.file.key
        }).promise()
      }
      return res.json({ error })
    }
  }

  async delete (req:Request, res:Response): Promise<Response> {
    const removeVideo = await Home.findById(req.params.id)
    await removeVideo.remove()

    return res.json({ removido: true })
  }
}
