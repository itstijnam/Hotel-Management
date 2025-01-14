import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (_, res)=>{
    return res.status(200).json({
        message: "I'm coming from backend",
        success: true
    })
})


const corsOption = {
    origin: process.env.FRONTEND_URI,
    credentials: true
}
app.use(cors(corsOption));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`http://localhost:${PORT}`)
});
