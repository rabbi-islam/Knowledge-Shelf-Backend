const express = require("express")
const { errorHandler } = require("./middleware/errorHandler")
const app =  express()
const bookRouter = require("./routes/bookRoute")
require("./config/db")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/v1", bookRouter)


app.get("/", (req,res)=>{
    res.status(200).json({
        message: "hello"
    })
})


//handling wrong route error
app.use((req,res, next)=>{
    res.status(404).json({
        message: "Wrong Route"
    })
})


//handling server error
app.use(errorHandler)


module.exports = app