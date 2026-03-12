import { Router } from "express";
import authController from "@/controllers/authController";
import { validateRegister, validateLogin } from "@/middleware/validators";


const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: >
 *       Creates a new user account. If `istechnician` is `true`, `registrationnumber` is required.
 *       If `istechnician` is `false`, `registrationnumber` must not be provided.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: "Registered successfully"
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               error:
 *                 - field: "email"
 *                   message: "Invalid email format"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               error:
 *                 error: "User already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 */
router.post("/register",validateRegister, authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in a user
 *     description: Authenticates a user with email and password, returning a JWT token on success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: " token: result.token"
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               error:
 *                 errors:
 *                   - field: "email"
 *                     message: "Email is required"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               error:
 *                 error: "Invalid credentials"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 */
router.post("/login",validateLogin, authController.login);

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *         - istechnician
 *       properties:
 *         fullname:
 *           type: string
 *           description: Full name of the user
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: "juan@example.com"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           description: Password (min 6 characters)
 *           example: "secret123"
 *         country:
 *           type: string
 *           description: Country of the user (optional)
 *           example: "Argentina"
 *         istechnician:
 *           type: boolean
 *           description: Whether the user is a technician
 *           example: false
 *         registrationnumber:
 *           type: string
 *           description: Registration number (required if istechnician is true, must be omitted otherwise)
 *           example: "TEC-001"
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: "juan@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: "secret123"
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Success"
 *     AuthErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Validation failed"
 *         error:
 *           oneOf:
 *             - type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                   message:
 *                     type: string
 *             - type: object
 *               additionalProperties: true
 */

export default router;
