const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
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
    days: {
      type: String,
      required: [true, "Please provide days"],
      minlength: [3, "At least 3 characters should be written"],
      maxlength: [50, "At most 50 characters should be written"],
    },
    lesson_time: {
      type: String,
      required: [true, "Please provide lesson time"],
    },
    teacher_name: {
      type: mongoose.Schema.Types.String,
      ref: "Teacher",
      required: [true, "Please provide a teacher name"],
      maxlength: 50,
    },
    phone_teacher: {
      type: String,
      required: [true, "Please provide a phone number"],
      validate: {
        validator: function (value) {
          return /^\+998\d{2} \d{3} \d{2} \d{2}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    teacher_image:{
      type:String,
    }
  },
  { timestamps: true, versionKey: false }
);

GroupSchema.statics.findByName = function (subject) {
  return this.find({ subject: new RegExp(subject, "i") });
};

module.exports = mongoose.model("Group", GroupSchema);
