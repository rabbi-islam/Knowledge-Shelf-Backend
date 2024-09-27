const orderModel = require("../models/orderModel")
const { throwError } = require("../utils/throwError")



const addOrder = async (req, res) => {

    const {bookId } = req.params


    const newOrder = await orderModel.create({
        ...req.body,
        bookId: bookId,
        orderBy: req.user._id,

    })

    res.status(201).json({
        success: true,
        book: newOrder,
    });



}

module.exports = addOrder