const Group = require("../models/Group");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require('../errors/bad-request')
const {StatusCodes} = require('http-status-codes')
const FileService = require('../utils/upload_file')

const getAllGroups = async (req, res) => {
  const groups = await Group.find({})
  if(!groups) {
    throw NotFoundError('NO groups was found')
  }
  res.status(StatusCodes.OK).json(groups)
}



const createGroup = async (req, res) => {
  try {
    const {subject, days, lesson_time, teacher_name, phone_teacher} = req.body;
    const { teacher_image } = req.files;

    if (!subject || !days || !lesson_time || !teacher_name || !phone_teacher || !teacher_image) {
      throw new BadRequestError('Please provide all required data, including an teacher_image')
    }
    const fileName = FileService.save(teacher_image);

    const group = await Group.create({
      subject,
      days,
      lesson_time,
      teacher_name,
      phone_teacher,
      teacher_image: fileName,
    });
    return res.status(201).json({
      message: "New group added successfully",
      group
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

// Get a group by name
const getGroupByName = async (req, res) => {
    try {
      const { name } = req.params;
    const group = await Group.findByName(name)
    const students = await Student.find({subject: name})
    const teacher = await Teacher.findOne({subject: name})
    if (!group) {
   throw new NotFoundError(`No group with name: ${name}`);
    }
    res.status(200).json({Group: group, Teacher: teacher, Students: students });
  } catch (error) {
    res.status(500).json({error: "Failed to fetch group details"});
  }
};

// Update a group by ID
const updateGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!group) {
      return res.status(404).send(`Group with the id ${id} not found`);
    }
    res.status(200).send(group);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a group by ID
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findByIdAndDelete(id);
    if (!group) {
      return res.status(404).send(`Group with the id ${id} not found`);
    }
    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = {
  getGroupByName,
  createGroup,
  updateGroup,
  deleteGroup,
  getAllGroups
}