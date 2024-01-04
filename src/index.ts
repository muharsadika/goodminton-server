import * as express from "express"
import { AppDataSource } from "./data-source"
import Env from "./utils/variable/Env"
import cors = require("cors")
import AdminAuthRoute from "./routes/admin/AdminAuthRoute"
import AdminBrandRoute from "./routes/admin/AdminBrandRoute"
import AdminCategoryRoute from "./routes/admin/AdminCategoryRoute"
import AdminProductRoute from "./routes/admin/AdminProductRoute"
import BuyerAuthRoute from "./routes/buyer/BuyerAuthRoute"
import BuyerCartRoute from "./routes/buyer/BuyerCartRoute"

AppDataSource.initialize()
    .then(() => {
        const app = express()
        const PORT = Env.EXPRESS_PORT

        app.use(cors())
        app.use(express.json())
        app.use("/api/admin", AdminAuthRoute)
        app.use("/api/admin", AdminBrandRoute)
        app.use("/api/admin", AdminCategoryRoute)
        app.use("/api/admin", AdminProductRoute)

        app.use("/api/buyer", BuyerAuthRoute)
        app.use("/api/buyer", BuyerCartRoute)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
            console.log(`- Developed by: @muharsadika -`)
        })
    })
    .catch((error) => console.log(error))