let express = require('express');
const mongodb = require('./mongodb/mongodb.utils')
const dotenv = require('dotenv')
dotenv.config()

let port = process.env.PORT;
let app = express();


let apiRoutes = require('./routes/api-routes')

app.use(express.json());

app.use('/v1/api', apiRoutes)


mongodb.connect()

app.listen(port, () => {
    console.log("running app on port ", port)
});

