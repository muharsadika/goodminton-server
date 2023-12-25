import * as express from "express"
import { AppDataSource } from "./data-source"
import Env from "./utils/variable/Env"
import cors = require("cors")
import AdminAuthRoute from "./routes/admin/AdminAuthRoute"

AppDataSource.initialize()
    .then(() => {
        const app = express()
        const PORT = Env.EXPRESS_PORT

        app.use(cors())
        app.use(express.json())
        app.use("/api", AdminAuthRoute)

        app.listen(PORT, () => {
            console.log(
                `
                Server is running on port ${PORT}
                - Developed by: @muharsadika -
                `
            );
        })
    })
    .catch((error) => console.log(error))