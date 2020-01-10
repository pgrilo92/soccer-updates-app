const mongoose = require('mongoose')

const db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
// mongoose.connect('mongodb://localhost/soccerupdatesdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })

const db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongoose is connected ${db.host}:${db.port}`)
})