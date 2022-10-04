import { connect } from "mongoose"


const MONGO_URI = `mongodb://localhost:27017/store-management`

// mongodb connection
connect(MONGO_URI)
    .then((): void => console.log('MongoDB Connected'))
    .catch((error): void => console.log(error))