// import imagesDatabase from './images.js'
import express from 'express'
import bodyParser from 'body-parser'
import albumRouter from './routers/albumy.js'
import connect from './initialize/db.js'
import cors from 'cors'
const port = 4000
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const app = express()
app.use(express.static('./uploads'));

// app.use(express.json({limit: '25mb'}))
// app.use(express.urlencoded({limit:'25mb', extended: true}))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(cors(corsOptions))
connect()

// app.use(express.static('public'))
app.use('/AlbumY', albumRouter)

app.listen(port, () => {
    console.log('Server is on port ' + port)
})
// console.log(imagesDatabase);
// console.log('this is my DB!');
