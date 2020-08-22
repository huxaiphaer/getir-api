let express = require('express');
const mongodb = require('./src/mongodb/mongodb.utils')
const dotenv = require('dotenv')
dotenv.config()

let port = process.env.PORT;
let app = express();


let apiRoutes = require('./src/routes/api-routes')

app.use(express.json());

app.use('/v1/api', apiRoutes)

mongodb.connect()

app.listen(port, () => {
    console.log("Application is running app on port ", port)
});


module.exports = app