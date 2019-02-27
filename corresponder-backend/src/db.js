import mongoose from 'mongoose'
import {username, password} from '../config/db'

mongoose.connect(`mongodb+srv://${username}:${password}@storage-lkdyw.gcp.mongodb.net/corresponder`, {useNewUrlParser: true})

const connection = mongoose.connection

connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', () => console.log('Connected to MongoDB database'))