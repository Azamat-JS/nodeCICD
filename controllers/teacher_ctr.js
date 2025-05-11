const { BadRequestError, NotFoundError } = require("../errors");
const Teacher = require("../models/Teacher");
const { StatusCodes } = require("http-status-codes");

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find().sort("teacher_name");
  res.status(StatusCodes.OK).json({ teachers, total: teachers.length });
};

const getOneTeacher = async (req, res) => {
  const { name } = req.params;
  const teacher = await Teacher.findByName(name);
  if (!teacher) {
    throw new NotFoundError(`No Teacher with id: ${id}`);
  }
  res.status(StatusCodes.OK).json(teacher);
};

const createTeacher = async (req, res, next) => {
  if(!req.fileUrl){
   return next(new BadRequestError('You should provide an image'))
  }
  const teacher = new Teacher({...req.body, teacher_image: req.fileUrl});
  await teacher.save()
  if (!teacher) {
    throw new BadRequestError("Please provide all the required fields");
  }
  res.status(StatusCodes.CREATED).json({
    message: "New teacher added successfully",
    teacher,
  });
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const editTeacher = req.body
  if(req.fileUrl){
    editTeacher.teacher_image = req.fileUrl
  }
  const teacher = await Teacher.findByIdAndUpdate(id, editTeacher, {
    new: true,
    runValidators: true,
  });
  if (!teacher) {
    throw new NotFoundError(`No Teacher with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({
    message: "Teacher updated successfully",
    teacher,
  });
};
const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findOneAndDelete(id);
  if (!teacher) {
    throw new NotFoundError(`No Teacher with id ${id}`);
  }
  res.status(StatusCodes.OK).send("Deleted successfully");
};

module.exports = {
  getAllTeachers,
  getOneTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};