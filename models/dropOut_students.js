const mongoose = require('mongoose')

const dropOutSchema = new mongoose.Schema({
    full_name: {
        type: String,
    },
    phone_student: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    dropoutDate: { type: Date, default: Date.now, index: { expires: '30d' } } 
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('DropOut', dropOutSchema)