import { Router } from "express";
import plotController from "../controllers/plotController";

const router = Router();

/**
 * @openapi
 * /api/plot:
 *   get:
 *     tags:
 *       - Plot
 *     summary: Get all plots
 *     description: Returns a list of all plot records.
 *     responses:
 *       200:
 *         description: A list of plots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plot'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", plotController.findAll);

/**
 * @openapi
 * /api/plot:
 *   post:
 *     tags:
 *       - Plot
 *     summary: Create a plot
 *     description: Creates a new plot record linked to an exploitation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePlot'
 *     responses:
 *       200:
 *         description: The created plot
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plot'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", plotController.create);

/**
 * @openapi
 * components:
 *   schemas:
 *     Plot:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *           example: "a12b3c40-65aa-42ec-a945-5fd21dec0538"
 *         name:
 *           type: string
 *           description: Plot name
 *           example: "Parcela Norte"
 *         totalsurface:
 *           type: number
 *           format: float
 *           description: Total surface area of the plot
 *           example: 150.5
 *         exploitation:
 *           type: string
 *           description: UUID of the associated exploitation
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *     CreatePlot:
 *       type: object
 *       required:
 *         - name
 *         - totalSurface
 *         - exploitationId
 *       properties:
 *         name:
 *           type: string
 *           description: Plot name
 *           example: "Parcela Norte"
 *         totalSurface:
 *           type: number
 *           format: float
 *           description: Total surface area of the plot
 *           example: 150.5
 *         exploitationId:
 *           type: string
 *           description: UUID of the exploitation this plot belongs to
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 */

export default router;
