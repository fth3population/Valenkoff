import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import index from "./Routers/index.js";
import errorMiddleware from "./middlewares/error-middleware.js";

dotenv.config()
const PORT = process.env.PORT

const app = express()
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(fileUpload({}))
app.use(cookieParser())
app.use('/static/patterns',express.static('static/patterns'))
app.use('/static/memes',express.static('static/memes'))
app.use('/api', index)
app.use(errorMiddleware)
app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log("Server started on port " + PORT))
        /*const user = await User.findOne({username: "McPing"})
        console.log(user.username)*/
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
