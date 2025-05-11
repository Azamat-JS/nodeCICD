const Group = require('../models/Group');
const Teacher = require('../models/Teacher');
const Student = require("../models/Student");
const DropOut = require("../models/dropOut_students");

const statistics = async (req, res) => {
  const groups = await Group.find();
  const students = await Student.find();
  const teachers = await Teacher.find();
  const dropOuts = await DropOut.find();
  res.status(200).json({groups: groups.length, students: students.length, teachers: teachers.length, dropOuts: dropOuts.length});
};


module.exports = statistics