require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const configViewEngine = require('./config/viewEngine');
const bodyParser = require('body-parser');
const webRoutes = require('./routes/web');
const UserRouter = require('./routes/UserRouter');
const ProductRouter = require('./routes/ProductRouter');
// const connection = require('./config/db');
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME
const db = process.env.MONGO_DB

// config template engine
configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser())

mongoose.connect(db)
    .then(() => {
        console.log("ok 1111")
    }).catch((err) => {
        console.log("222222", err)
    })

// defile router
app.use('/', webRoutes)
app.use('/api/user', UserRouter)
app.use('/api/product', ProductRouter)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})