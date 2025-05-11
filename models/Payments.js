const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 20,
  },
  phone_student:{
    type:String,
    required:[true, 'Please provide the phone number'],
    validate:{
        validator: function(value){
            return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value)
        },
        // message: "Phone number is not valid"
        message: props => `${props.value} is not a valid phone number!`
    },
    required:[true, 'Student phone number required'],
},

subject:{
  type:String,
  required:[true, 'Please provide a subject'],
  enum:{
      values: ["Mathematics", "Biology", "English", "Physics", "Chemistry"],
      message: "{VALUE} is not supported"
  },
},
teacher_name:{
  type:String,
  required:[true, 'Please provide teachers name'],
  minlength: 3,
  maxlength: 40,
},
  payment_day:{
    type:Date,
    default: Date.now
  }
},{ timestamps: true, versionKey: false });

module.exports = mongoose.model("Payment", PaymentSchema);
