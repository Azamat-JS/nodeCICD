const { string } = require("joi");
const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    teacher_name: {
      type: String,
      required: [true, "Please provide a teacher name"],
      maxlength: 50,
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject"],
      enum: {
        values: ["Mathematics", "Biology", "English", "Physics", "Chemistry"],
        message: "{VALUE} is not supported",
      },
      minlength: [3, "At least 3 characters should be written"],
      maxlength: [30, "At most 50 characters should be written"],
    },
    phone_teacher: {
      type: String,
      required: [true, "Please provide the phone number"],
      validate: {
        validator: function (value) {
          return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Teacher phone number required"],
    },
    teacher_image:{
      type:String,
    }
  },
  { timestamps: true, versionKey: false }
);

TeacherSchema.statics.findByName = function (teacher_name) {
  return this.find({ teacher_name: new RegExp(teacher_name, "i") });
};

module.exports = mongoose.model("Teacher", TeacherSchema);
