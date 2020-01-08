const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/soccerupdatesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongoose is connected ${db.host}:${db.port}`)
})