/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       required:
 *         - teacher_name
 *         - subject
 *         - phone_teacher
 *       properties:
 *         teacher_name:
 *           type: string
 *           description: The name of the teacher
 *           example: "John Smith"
 *         subject:
 *           type: string
 *           enum: [Mathematics, Biology, English, Physics, Chemistry]
 *           description: The subject the teacher teaches
 *           example: "Mathematics"
 *         phone_teacher:
 *           type: string
 *           description: The teacher's phone number
 *           example: "+99891 123 45 67"
 *         teacher_image:
 *           type: string
 *           description: The image filename of the teacher
 *           example: "teacher1.jpg"
 */

const { Router } = require("express");
const router = Router();
const { getAllTeachers, getOneTeacher, createTeacher, deleteTeacher, updateTeacher } = require("../controllers/teacher_ctr");
const FileUploader = require('../utils/multer')

/**
 * @swagger
 * /teachers:
 *   get:
 *     tags:
 *       - Teachers
 *     summary: Get all teachers
 *     description: Retrieves a list of all available teachers.
 *     responses:
 *       200:
 *         description: A list of teachers retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/teachers", getAllTeachers);

/**
 * @swagger
 * /getOne_teacher/{name}:
 *   get:
 *     tags:
 *       - Teachers
 *     summary: Get details of a single teacher
 *     description: Retrieves details of a teacher by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the teacher
 *     responses:
 *       200:
 *         description: Teacher details retrieved successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/getOne_teacher/:name", getOneTeacher);

/**
 * @swagger
 * /teachers:
 *   post:
 *     tags:
 *       - Teachers
 *     summary: Add a new teacher
 *     description: Adds a new teacher to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               teacher_name:
 *                 type: string
 *               subject:
 *                 type: string
 *               phone_teacher:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Teacher added successfully
 *       400:
 *         description: Missing required fields or image
 *       500:
 *         description: Internal Server Error
 */
router.post("/teachers", FileUploader.singleImage, createTeacher);

/**
 * @swagger
 * /update_teacher/{id}:
 *   put:
 *     tags:
 *       - Teachers
 *     summary: Update a teacher's details
 *     description: Updates details of an existing teacher by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               teacher_name:
 *                 type: string
 *               subject:
 *                 type: string
 *               phone_teacher:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update_teacher/:id", FileUploader.singleImage, updateTeacher);

/**
 * @swagger
 * /delete_teacher/{id}:
 *   delete:
 *     tags:
 *       - Teachers
 *     summary: Delete a teacher
 *     description: Deletes a teacher from the system by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher to delete
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete_teacher/:id", deleteTeacher);

module.exports = router;
