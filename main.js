import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import routerUser from "./Routers/routerUser.js";
import routerAdmin from "./Routers/routerAdmin.js";
import routerMeme from "./Routers/routerMeme.js";
import routerPattern from "./Routers/routerPattern.js";
import AdminController from "./Controllers/AdminController.js";
import Admin from "./Classes/Admin.js";
import User from "./Classes/User.js";

const PORT = 5000

const app = express()
const DB_URL = 'mongodb+srv://fth3population:mamapapa@cluster0.zldp8dx.mongodb.net/?retryWrites=true&w=majority'

app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))
app.use('/api_memes', routerMeme)
app.use('/api_patterns', routerPattern)
app.use('/user', routerUser)
app.use('/admin', routerAdmin)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log("Server started on port " + PORT))
        const user = await User.findOne({username: "McPing"})
        console.log(user.username)
        /*const admins = await Admin.findById("64281ef451e8eff9bbff6c9b");
        const admin = new Admin({
            login: admins.login,
            email: admins.email,
            password: admins.password,
        })
        await admin.save()
        console.log(admin)*/
    } catch (e) {
        console.log(e)
    }
}

startApp()
