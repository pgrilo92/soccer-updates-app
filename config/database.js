const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://pgrilo92:<camera92>@soccer-database-vwsyo.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
// mongoose.connect('mongodb://localhost/soccerupdatesdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })
