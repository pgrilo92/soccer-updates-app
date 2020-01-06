const mongoos = require('mongoose')

const Schema = mongoose.Schema

const userDataSchema = new Schema({

}, {
    timestamps: true
})

module.exports= mongoose.model('User', userDataSchema)