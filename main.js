import express from 'express'
import mongoose from 'mongoose'
import User from "./Classes/User.js";
import routerUser from "./Routers/routerUser.js";
import routerAdmin from "./Routers/routerAdmin.js";
import routerMeme from "./Routers/routerMeme.js";
import routerPattern from "./Routers/routerPattern.js";
const PORT = 5000

const app = express()
const DB_URL = 'mongodb+srv://fth3population:mamapapa@cluster0.zldp8dx.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json())
app.use('/api_memes', routerMeme)
app.use('/api_patterns', routerPattern)
app.use('/user', routerUser)
app.use('/admin', routerAdmin)

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
