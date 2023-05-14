import dotenv from  "dotenv"

import Application from "./app"

dotenv.config();

const Default_Port = 4000
const PORT = Number(process.env.PORT || Default_Port)

const app = new Application(PORT);

app.listen();