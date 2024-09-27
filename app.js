const express = require("express")
const { errorHandler } = require("./middleware/errorHandler")
const app =  express()
const bookRouter = require("./routes/bookRoute")
const userRouter = require("./routes/userRoute")
require("./config/db")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/v1", bookRouter)
app.use("/api/v1/auth", userRouter)
app.use("/api/v1", userRouter)


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