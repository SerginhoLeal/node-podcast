import { Request, Response } from 'express'
import Home from './Home'

export class HomeController {
  async index (req:Request, res:Response): Promise<Response> {
    const docs = await Home.find().sort({ createAt: -1 })

    return res.json({ docs })
  }

  async create (req:Request, res:Response) {
    const { artist, title, category } = req.body
    const docs = await Home.find()
    try {
      const create = await Home.create({
        title,
        artist,
        creator: req.userId,
        key: req.file.key,
        category,
        artwork: 'xxx',
        url: req.file.location,
        id: docs.length + 1
      })
      return res.json({ create })
    } catch (error) {
      return res.json({ error })
    }
  }
}
