/**
 * Controle de autenticação/registro de um ouvinte
*/

import { Request, Response } from 'express'
import Authentication from './Listener'

// import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authConfig = process.env.GERANDO_TOKEN_LISTENER

function generateToken (params = {}) {
  return jwt.sign(params, authConfig, {
    expiresIn: 86400
  })
}

class ListenerController {
  async login (req:Request, res:Response): Promise<Response> {
    const { nickname, password } = req.body
    try {
      const Auth = await Authentication.findOne({ nickname }).select('+password')

      if (!Auth) return res.status(400).send({ error: 'fail' })

      if (!await bcrypt.compare(password, Auth.password)) return res.status(400).send({ error: 'fail' })

      Auth.password = undefined

      return res.send({ Auth, token: generateToken({ id: Auth.id }) })
    } catch (e) {
      return res.status(400).send({ error: e })
    }
  }

  async create (req:Request, res:Response): Promise<Response> {
    const { name, nickname, password, confPass, contact } = req.body

    if (password !== confPass) return res.status(400).json({ message: 'Senha não bate' })

    try {
      const Auth = await Authentication.create({
        name,
        nickname,
        password,
        contact
      })

      if (Auth) return res.status(200).json({ success: true })
    } catch (err) {
      if (err.keyValue.nickname) return res.json({ nickname_not_available: true })
      if (err.keyValue.contact) return res.json({ contact_not_available: true })
    }
  }
}

export { ListenerController }
