const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    team: String,
    teamId: Number,
    logo: String,
    venueName: String,
    venueCity: String,

}, {
    timestamps: true
})

const dashboardSchema = new Schema({
    league: {
        type: String,
        enum: ['Premier League', 'La Liga', 'Serie A', 'Ligue 1']
    },
    league_id: Number,
    logo: String,
    season: Number,
    country: String,
    teams: [teamSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Dashboard', dashboardSchema)