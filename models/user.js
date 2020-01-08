const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userDataSchema = new Schema({
    name: String,
    email: String,
    avatar: String,
    dashboards: [{ type: Schema.Types.ObjectId, ref: 'Dashboard'}],
    googleId: String
}, {
    timestamps: true
})

module.exports= mongoose.model('User', userDataSchema)