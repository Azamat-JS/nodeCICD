/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - subject
 *         - days
 *         - lesson_time
 *         - teacher_name
 *         - phone_teacher
 *       properties:
 *         subject:
 *           type: string
 *           enum: [Mathematics, Biology, English, Physics, Chemistry]
 *           description: The subject of the group
 *           example: "Mathematics"
 *         days:
 *           type: string
 *           description: Days when lessons are conducted
 *           example: "Monday, Wednesday, Friday"
 *         lesson_time:
 *           type: string
 *           description: The time of the lesson
 *           example: "14:00 - 16:00"
 *         teacher_name:
 *           type: string
 *           description: The name of the teacher assigned to the group
 *           example: "John Smith"
 *         phone_teacher:
 *           type: string
 *           description: The teacher's phone number
 *           example: "+99891 123 45 67"
 *         teacher_image:
 *           type: string
 *           description: The image filename of the teacher
 *           example: "teacher1.jpg"
 */

const express = require("express");
const router = express.Router();
const {
  createGroup,
  getAllGroups,
  getGroupByName,
  updateGroup,
  deleteGroup,
} = require("../controllers/groups");

/**
 * @swagger
 * /groups:
 *   get:
 *     tags:
 *       - Groups
 *     summary: Get all groups
 *     description: Retrieves a list of all available groups.
 *     responses:
 *       200:
 *         description: A list of groups retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/groups", getAllGroups);

/**
 * @swagger
 * /groups:
 *   post:
 *     tags:
 *       - Groups
 *     summary: Add a new group
 *     description: Adds a new group to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               days:
 *                 type: string
 *               lesson_time:
 *                 type: string
 *               teacher_name:
 *                 type: string
 *               phone_teacher:
 *                 type: string
 *               teacher_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Group added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/groups", createGroup);

/**
 * @swagger
 * /groups/{name}:
 *   get:
 *     tags:
 *       - Groups
 *     summary: Get details of a single group
 *     description: Retrieves details of a group by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the group
 *     responses:
 *       200:
 *         description: Group details retrieved successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/groups/:name", getGroupByName);

/**
 * @swagger
 * /update_group/{id}:
 *   put:
 *     tags:
 *       - Groups
 *     summary: Update a group's details
 *     description: Updates details of an existing group by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               days:
 *                 type: string
 *               lesson_time:
 *                 type: string
 *               teacher_name:
 *                 type: string
 *               phone_teacher:
 *                 type: string
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update_group/:id", updateGroup);

/**
 * @swagger
 * /delete_group/{id}:
 *   delete:
 *     tags:
 *       - Groups
 *     summary: Delete a group
 *     description: Deletes a group from the system by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group to delete
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete_group/:id", deleteGroup);

module.exports = router;
