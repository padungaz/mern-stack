require('dotenv').config()
const express = require('express');
const cors = require('cors');
const configViewEngine = require('./config/viewEngine');
const bodyParser = require('body-parser');
const webRoutes = require('./routes/web');
const UserRouter = require('./routes/UserRouter');
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

// test connection
// connection.query(
//     'select * from Users u',
//     function (err, results, fields) {
//         console.log("results", results); // results contains rows returned by server
//         console.log("fields", fields); // fields contains extra meta data about results, if available
//     }
// );

mongoose.connect(db)
    .then(() => {
        console.log("trueeeee")
    }).catch((err) => {
        console.log("222222", err)
    })

// defile router
app.use('/', webRoutes)
app.use('/api/user', UserRouter)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})