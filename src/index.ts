import * as express from "express"
import { AppDataSource } from "./data-source"

AppDataSource.initialize()
    .then(() => {
        const app = express()
        const PORT = process.env.EXPRESS_PORT

        app.use(express.json())
        // app.use("/api", Router)

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