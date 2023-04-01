import express from 'express'
import mongoose from 'mongoose'
import User from "./User.js";
import router from "./router.js";
const PORT = 5000

const app = express()
const DB_URL = 'mongodb+srv://fth3population:mamapapa@cluster0.zldp8dx.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json())
app.use('/api', router)

async function startApp(){
    try{
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log("Server started on port " + PORT))
    }
    catch (e){
        console.log(e)
    }
}

startApp()
