const Payment = require("../models/Payments");
const Student = require("../models/Student");
const NotFoundError = require("../errors/not-found");
const createPayment = async (req, res) => {
    try {
        const {phone_student} = req.body;
        const student = await Student.findOne({phone_student});
        if(!student){
           throw new NotFoundError(`No student with phone number: ${phone_student}`);
        }
        const payment = new Payment(req.body);
        await payment.save();
        res.status(201).json({message:`The payment has been carried out successfully`, payment});
    } catch (error) {
        res.status(400).json({
            message:error.message
        });
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({}).limit(4).sort('createdAt');
        res.status(200).json({payments: payments, total: payments.length});
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getPayments,
    createPayment
}