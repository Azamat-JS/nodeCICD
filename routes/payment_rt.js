/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - full_name
 *         - phone_student
 *         - subject
 *         - teacher_name
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
 *           description: The subject the student is enrolled in
 *           enum:
 *             - Mathematics
 *             - Biology
 *             - English
 *             - Physics
 *             - Chemistry
 *           example: "Mathematics"
 *         teacher_name:
 *           type: string
 *           description: The name of the teacher associated with the payment
 *           example: "Jane Smith"
 *         payment_day:
 *           type: string
 *           format: date
 *           description: The date the payment was made
 *           example: "2025-02-03"
 *       example:
 *         full_name: "John Doe"
 *         phone_student: "+99891 123 45 67"
 *         subject: "Mathematics"
 *         teacher_name: "Jane Smith"
 *         payment_day: "2025-02-03"
 */
const express = require("express");
const router = express.Router();
const { createPayment, getPayments } = require("../controllers/payments");

/**
 * @swagger
 * /payments:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get all payments
 *     description: Retrieves a list of all recent payments (limit to 4).
 *     responses:
 *       200:
 *         description: A list of recent payments successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *                 total:
 *                   type: integer
 *                   description: The total number of payments retrieved
 *       500:
 *         description: Internal Server Error
 */
router.get("/payments", getPayments);

/**
 * @swagger
 * /payments:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create a new payment record
 *     description: Allows creating a new payment record for a student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: The payment has been successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The payment has been carried out successfully"
 *                 payment:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad Request (Invalid data)
 *       404:
 *         description: Student not found
 */
router.post("/payments", createPayment);

module.exports = router;
