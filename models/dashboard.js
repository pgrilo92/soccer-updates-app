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
        //enum: ['premier_league', 'la_liga', 'Serie_A', 'ligue_1']
    },
    league_id: Number,
    logo: String,
    season: { 
        type: Number,
        default: 2019
    },
    country: String,
    teams: [teamSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Dashboard', dashboardSchema)