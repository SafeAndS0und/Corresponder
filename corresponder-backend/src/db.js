import mongoose from 'mongoose'
import {username, password} from '../config/db'

mongoose.connect(`mongodb+srv://${username}:${password}@storage-lkdyw.gcp.mongodb.net/admin`, {useNewUrlParser: true})

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
   console.log('connected')
});