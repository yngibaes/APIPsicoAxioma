import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './config/routes.js'

const app = express()

const corsOption={
    //Conect rutes
    origin: '*' //'localhost:3000'
}

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api',cors(corsOption), router)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

const server = app.listen (8000,()=>{
    console.log(`Server running on port ${server.address().port}`)
})

export default app