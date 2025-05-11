const { Router } = require('express');
const router = Router();
const statistics = require('../controllers/main');

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Fetch statistics for groups, students, teachers, and dropouts
 *     description: Returns the counts of groups, students, teachers, and dropouts.
 *     responses:
 *       200:
 *         description: Successful response with counts of groups, students, teachers, and dropouts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 groups:
 *                   type: integer
 *                   description: Number of groups
 *                 students:
 *                   type: integer
 *                   description: Number of students
 *                 teachers:
 *                   type: integer
 *                   description: Number of teachers
 *                 dropOuts:
 *                   type: integer
 *                   description: Number of dropouts
 *       500:
 *         description: Internal Server Error
 */
router.get("/", statistics);

module.exports = router;
