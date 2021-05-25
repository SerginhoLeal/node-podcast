import express from 'express'
import mongoose from 'mongoose'
require('dotenv').config()

// eslint-disable-next-line import/first
import { routes } from './routes'

const app = express()

app.use(express.json()) // Sem isso, todas as requisições feito pelo insomnia retornarão undefined

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

app.use('/api', routes)

app.listen(process.env.PORT || 5000)
