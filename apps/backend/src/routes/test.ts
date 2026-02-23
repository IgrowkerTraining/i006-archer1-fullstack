import { Router } from "express";
import testController from "../controllers/testController";

const router = Router();

/**
 * @openapi
 * /api/test:
 *   get:
 *     tags:
 *       - Test
 *     summary: Get all test users
 *     description: Returns a list of all usertest records from the database.
 *     responses:
 *       200:
 *         description: A list of test users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserTest'
 */
router.get("/", testController.findAll);

/**
 * @openapi
 * /api/test:
 *   post:
 *     tags:
 *       - Test
 *     summary: Create a test user
 *     description: Creates a new usertest record in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserTest'
 *     responses:
 *       200:
 *         description: The created test user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTest'
 */
router.post("/", testController.create);

/**
 * @openapi
 * components:
 *   schemas:
 *     UserTest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *           example: 1
 *         name:
 *           type: string
 *           description: User name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: User email
 *           example: "john@example.com"
 *     CreateUserTest:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *       properties:    
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *           example: 1
 *         name:
 *           type: string
 *           description: User name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: User email
 *           example: "john@example.com"
 */

export default router;