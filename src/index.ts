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
import BuyerProfileRoute from "./routes/buyer/buyerProfileRoute"
import BuyerProductRoute from "./routes/buyer/BuyerProductRoute"
import MidtransRoute from "./routes/midtrans/MidtransRoute"

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

        app.use("/api", BuyerAuthRoute)
        app.use("/api", BuyerProfileRoute)
        app.use("/api", BuyerProductRoute)
        app.use("/api", BuyerCartRoute)

        app.use("/api", MidtransRoute)

        app.use("/", (req: express.Request, res: express.Response) => {
            res.send("Server is running...")
        })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
            console.log(`- Developed by: @muharsadika -`)
        })
    })
    .catch((error) => console.log(error))