import express from 'express'

const app = express()

app.get('/', (req, res) => {})


export default {
   asd: 'asd'
}
app.listen(3001, () => console.log(`server's up!`))