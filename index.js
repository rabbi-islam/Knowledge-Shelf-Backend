require("dotenv").config()
const app = require("./app")
const config = require("./config/config") 
const port = config.app.port 




app.listen(port, () => {
    console.log(`Server started http://localhost:${port}`)
})

