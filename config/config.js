const app = require("../app")



const dev = {
    app: {
        port:process.env.PORT || 8080
    },
    db:{
        url: process.env.DB_URL || "mongodb://localhost:27017/userDemoDB"
    }
}

module.exports = dev