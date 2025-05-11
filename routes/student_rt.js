/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - full_name
 *         - phone_student
 *         - subject
 *         - parents_name
 *         - phone_parents
 *       properties:
 *         full_name:
 *           type: string
 *           description: The full name of the student
 *           example: "John Doe"
 *         phone_student:
 *           type: string
 *           description: The phone number of the student
 *           example: "+99891 123 45 67"
 *         subject:
 *           type: string
 *           enum: [Mathematics, Biology, English, Physics, Chemistry]
 *           description: The subject the student is enrolled in
 *           example: "Mathematics"
 *         parents_name:
 *           type: string
 *           description: The name of the student's parents
 *           example: "Jane Doe"
 *         phone_parents:
 *           type: string
 *           description: The phone number of the student's parents
 *           example: "+99890 987 65 43"
 *         image:
 *           type: string
 *           description: The filename of the student's image
 *           example: "student1.jpg"
 */

const express = require("express");
const router = express.Router();
const { createStudent, getAllStudents, getOneStudent, updateStudent, deleteStudent } = require("../controllers/students");
const FileUploader = require('../utils/multer')

/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get all students
 *     description: Retrieves a list of all students
 *     responses:
 *       200:
 *         description: A list of students retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/students", getAllStudents);

/**
 * @swagger
 * /getOne_student/{id}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get details of a single student
 *     description: Retrieves details of a student by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the student
 *     responses:
 *       200:
 *         description: Student details retrieved successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/getOne_student/:id", getOneStudent);

/**
 * @swagger
 * /students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Add a new student
 *     description: Adds a new student with their information and an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone_student:
 *                 type: string
 *               subject:
 *                 type: string
 *                 enum: [Mathematics, Biology, English, Physics, Chemistry]
 *               parents_name:
 *                 type: string
 *               phone_parents:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Student added successfully
 *       400:
 *         description: Missing required fields or invalid input
 *       500:
 *         description: Internal Server Error
 */
router.post("/students", FileUploader.singleImage, createStudent);

/**
 * @swagger
 * /update_student/{id}:
 *   put:
 *     tags:
 *       - Students
 *     summary: Update student details
 *     description: Updates an existing student's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the student
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone_student:
 *                 type: string
 *               subject:
 *                 type: string
 *                 enum: [Mathematics, Biology, English, Physics, Chemistry]
 *               parents_name:
 *                 type: string
 *               phone_parents:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Missing required fields or invalid input
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update_student/:id", FileUploader.singleImage, updateStudent);

/**
 * @swagger
 * /delete_student/{id}:
 *   delete:
 *     tags:
 *       - Students
 *     summary: Delete a student
 *     description: Deletes a student by their ID and moves them to the dropout list
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the student
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete_student/:id", deleteStudent);

module.exports = router;
