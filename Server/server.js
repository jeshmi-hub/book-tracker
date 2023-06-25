const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const multer = require("multer");



app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../client/public/images')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    },
});

const upload = multer({storage})

app.post('/upload', upload.single('file'), function(req,res){
    const file = req.file;
    res.status(200).json(file.filename)
});

const userRoute = require('./routes/user');
app.use('/', userRoute)
const bookRoute = require('./routes/book');
app.use('/', bookRoute)
const reviewRoute = require('./routes/review');
app.use('/', reviewRoute)
const scheduleRoute = require("./routes/scheduler");
app.use('/', scheduleRoute) 
const port = process.env.PORT || 8000



app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})
