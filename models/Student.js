const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const StudentSchema = new mongoose.Schema({
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
        message: props => `${props.value} is not a valid phone number!`
    },
},
subject:{
   type:String,
  required:[true, 'Please provide a subject'],
  enum:{
      values: ["Mathematics", "Biology", "English", "Physics", "Chemistry"],
      message: "{VALUE} is not supported"
  },
},
parents_name:{
  type:String,
  required:[true, 'Please provide parents name'],
  minlength: 3,
  maxlength: 40,
},
  phone_parents:{
    type:String,
    required:[true, 'Please provide the parents phone number'],
    validate:{
        validator: function(value){
            return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value)
        },
        message: props => `${props.value} is not a valid phone number!`
    },
  },
  image:{
    type:String,
  },
},{ timestamps: true, versionKey: false });

StudentSchema.statics.findByName = function (full_name) {
  return this.find({ full_name: new RegExp(full_name, "i") });
};

module.exports = mongoose.model("Student", StudentSchema);
