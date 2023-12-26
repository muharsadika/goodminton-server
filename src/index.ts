import * as express from "express"
import { AppDataSource } from "./data-source"
import Env from "./utils/variable/Env"
import cors = require("cors")
import AdminAuthRoute from "./routes/admin/AdminAuthRoute"
import AdminBrandRoute from "./routes/admin/AdminBrandRoute"
import AdminCategoryRoute from "./routes/admin/AdminCategoryRoute"
import AdminProductRoute from "./routes/admin/AdminProductRoute"

AppDataSource.initialize()
    .then(() => {
        const app = express()
        const PORT = Env.EXPRESS_PORT

        app.use(cors())
        app.use(express.json())
        app.use("/api", AdminAuthRoute)
        app.use("/api", AdminBrandRoute)
        app.use("/api", AdminCategoryRoute)
        app.use("/api", AdminProductRoute)

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