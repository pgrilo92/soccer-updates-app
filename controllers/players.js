let key = process.env.NBA_API_KEY
const axios = require("axios");
let nbaPlayersPath = "https://free-nba.p.rapidapi.com/players/"
let find = (req, res) => {
    // axios({
    //     "method":"GET",
    //     "url":"https://free-nba.p.rapidapi.com/players",
    //     "headers":{
    //     "content-type":"application/octet-stream",
    //     "x-rapidapi-host":"free-nba.p.rapidapi.com",
    //     "x-rapidapi-key":"7e805c7225mshc1068149de6b799p16bd57jsnd12d02db5465"
    //     },"params":{
    //     "page":"0",
    //     "per_page":"25"
    //     }
    //     })
    //     .then((response)=>{
    //       console.log(response)
    //     })
    //     .catch((error)=> {
    //       console.log(error)
    //     })
    res.render('players/index', {title: "NBA Updates"})
}
    
module.exports = {
    find
}

