import dotenv from "dotenv"
dotenv.config()
import app from "./app"
import documentUpload from "./Routes/documentUpload.Route"
import { connectToMongodb } from "./db/connection"


app.get("/", (req, res) => {
    res.json({
        message: "working fine"
    })
})

app.use("/api/document", documentUpload)

const PORT = process.env.PORT

connectToMongodb()
    .then(() => app.listen(PORT, () => {
        console.log(`port is running on ${PORT}`)
    })
    ).catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });
