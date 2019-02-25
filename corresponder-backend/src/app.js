import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Router from './routes/index'

const app = express()

app.use(cors()) // takes care of local development problems

app.use(morgan("common")) // logger

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Router)

export default app

