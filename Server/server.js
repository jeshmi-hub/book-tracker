const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser')



app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

const userRoute = require('./routes/user');
app.use('/', userRoute)
const port = process.env.PORT || 8000



app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})
