const {
  BadRequestError,
  NotFoundError,
} = require("../errors");
const Student = require("../models/Student");
const Group = require("../models/Group");
const { StatusCodes } = require("http-status-codes");
const DropOut = require('../models/dropOut_students')

const getAllStudents = async (req, res) => {
  const students = await Student.find().sort('full_name');
  res.status(StatusCodes.OK).json({ students, total: students.length });
};

const getOneStudent = async (req, res) => {
  const {id} = req.params
  const student = await Student.findById(id);
  if (!student) {
    throw new NotFoundError(`No Student with id: ${id}`);
  }
  res.status(StatusCodes.OK).json(student);
};

const createStudent = async (req, res, next) => {
 if(!req.fileUrl){
    return next(new BadRequestError('You should provide an image'))
 }
    const student = new Student({...req.body, image: req.fileUrl});    
    await student.save();

  res.status(201).json({
      message: "New student added successfully",
      student,
    });
  }

const updateStudent = async (req, res) => {
  const {id} = req.params
  const editStudent = req.body
  if(req.fileUrl){
    editStudent.image = req.fileUrl
  }
  const student = await Student.findByIdAndUpdate(id, editStudent, {new:true, runValidators:true})
  if(!student){
    throw new NotFoundError(`No Student with id: ${id}`)
  }
  res.status(StatusCodes.OK).json(student)
}

const deleteStudent = async (req, res) => {
  const {id} = req.params
  const student = await Student.findByIdAndDelete(id)

  if(!student){
    return(404).send(`No Student with id: ${id}`)
  }
  await DropOut.create({full_name: student.full_name, phone_student: student.phone_student})
  res.status(StatusCodes.OK).send('Deleted successfully')
};
module.exports = {
  getAllStudents,
  getOneStudent,
  updateStudent,
  createStudent,
  deleteStudent,
};
