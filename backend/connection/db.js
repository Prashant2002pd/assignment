const mongoose= require('mongoose')
const dotenv=require('dotenv')
dotenv.config()



function connect(){
    mongoose.connect(process.env.DB)
    .then(() => console.log('Connected to MongoDB'))
}
connect()

