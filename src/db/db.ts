import { connect } from "mongoose"
import dotenv from "dotenv"
dotenv.config()

// const MONGO_URI = `mongodb://localhost:27017/store-management`
const MONGO_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.8xgxmx2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// mongodb connection
connect(MONGO_URI)
    .then((): void => console.log('MongoDB Connected'))
    .catch((error): void => console.log(error))