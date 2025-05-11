/**
 * @swagger
 * components:
 *   schemas:
 *     Appeal:
 *       type: object
 *       required:
 *         - student_name
 *         - phone_number
 *         - appeal
 *       properties:
 *         student_name:
 *           type: string
 *           description: The name of the student submitting the appeal
 *           example: "John Doe"
 *         phone_number:
 *           type: string
 *           description: The phone number of the student
 *           example: "+99891 123 45 67"
 *         appeal:
 *           type: string
 *           description: The content of the appeal
 *           example: "I need additional support for my course."
 */

const express = require("express");
const router = express.Router();
const {
  getAllAppeals,
  writeAppeal,
  deleteAppeal,
  getTodaysAppeals,
  getYesterdaysAppeals,
} = require("../controllers/appeals");

/**
 * @swagger
 * /appeals:
 *   get:
 *     tags:
 *       - Appeals
 *     summary: Get all appeals
 *     description: Retrieves a list of all submitted appeals.
 *     responses:
 *       200:
 *         description: A list of appeals retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/appeals", getAllAppeals);

/**
 * @swagger
 * /appeals:
 *   post:
 *     tags:
 *       - Appeals
 *     summary: Submit a new appeal
 *     description: Allows a student to submit an appeal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appeal'
 *     responses:
 *       201:
 *         description: Appeal submitted successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/appeals", writeAppeal);

/**
 * @swagger
 * /appealsToday:
 *   get:
 *     tags:
 *       - Appeals
 *     summary: Get today's appeals
 *     description: Retrieves all appeals submitted today.
 *     responses:
 *       200:
 *         description: Today's appeals retrieved successfully
 *       404:
 *         description: No appeals received today
 *       500:
 *         description: Internal Server Error
 */
router.get("/appealsToday", getTodaysAppeals);

/**
 * @swagger
 * /appealsYesterday:
 *   get:
 *     tags:
 *       - Appeals
 *     summary: Get yesterday's appeals
 *     description: Retrieves all appeals submitted yesterday.
 *     responses:
 *       200:
 *         description: Yesterday's appeals retrieved successfully
 *       404:
 *         description: No appeals received yesterday
 *       500:
 *         description: Internal Server Error
 */
router.get("/appealsYesterday", getYesterdaysAppeals);

/**
 * @swagger
 * /appeals/{id}:
 *   delete:
 *     tags:
 *       - Appeals
 *     summary: Delete an appeal
 *     description: Deletes an appeal by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appeal to delete
 *     responses:
 *       200:
 *         description: Appeal deleted successfully
 *       404:
 *         description: Appeal not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/appeals/:id", deleteAppeal);

module.exports = router;
