const mongoose = require('mongoose')

const appealsSchema = new mongoose.Schema({
    student_name:{
        type:String,
        required: [true, "Student's name must be provided"]
    },
    phone_number:{
        type:String,
        required: [true, "Please provide a phone number"],
        validate: {
          validator: function (value) {
            return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value);
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    appeal:{
        type:String,
        required: [true, 'Please provide your appeal'],
        maxlength:[200, 'Appeal must be at most 200 characters']
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Appeal', appealsSchema)