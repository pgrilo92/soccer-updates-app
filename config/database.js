const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://pgrilo92:<camera92>@soccer-database-vwsyo.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
//'mongodb://localhost/soccerupdatesdb'

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongoose is connected ${db.host}:${db.port}`)
})