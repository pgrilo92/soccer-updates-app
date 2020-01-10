const mongoose = require('mongoose')

const uri = process.env.MONGODB_URL
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongoose is connected ${db.host}:${db.port}`)
})