import { Router } from "express";
import observationController from "@/controllers/observationController";
import  {authenticateJWT}  from "../middleware/auth.middleware";
import  {requireTechnician}  from "../middleware/role.middleware";


const router = Router();

/**
 * @openapi
 * /api/observation:
 *   post:
 *     tags:
 *       - Observation
 *     summary: Create an observation
 *     description: >
 *       Creates a new observation record for an agro-activity.
 *       The date is automatically set to the current date at creation time.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateObservationRequest'
 *     responses:
 *       200:
 *         description: The created observation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Observation'
 */
router.post("/", observationController.createObservation);

/**
 * @openapi
 * /api/observation/{activity}:
 *   get:
 *     tags:
 *       - Observation
 *     summary: Get observations by activity
 *     description: >
 *       Returns all observations for a given activity.
 *       Supports optional query filters for agroactivity, plot, and period (month number).
 *     parameters:
 *       - in: path
 *         name: activity
 *         required: true
 *         schema:
 *           type: string
 *         description: The agro-activity ID to fetch observations for
 *       - in: query
 *         name: agroactivity
 *         required: false
 *         schema:
 *           type: string
 *         description: Override the activity filter with a specific agro-activity ID
 *       - in: query
 *         name: plot
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter observations by plot ID (through the agroactivity relation)
 *       - in: query
 *         name: period
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter observations by month number (1-12), uses current year
 *         example: "2"
 *     responses:
 *       200:
 *         description: A list of observations matching the filters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Observation'
 */
router.get("/:activity",authenticateJWT,requireTechnician, observationController.getObservationsByActivity);

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateObservationRequest:
 *       type: object
 *       required:
 *         - technician
 *         - observation
 *         - agroactivity
 *       properties:
 *         technician:
 *           type: string
 *           description: Technician user ID
 *           example: "tech-uuid-001"
 *         observation:
 *           type: string
 *           description: Observation text content
 *           example: "Se detectó presencia de plagas en el sector norte del lote"
 *         agroactivity:
 *           type: string
 *           description: Agro-activity ID this observation belongs to
 *           example: "activity-uuid-001"
 *     Observation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *           example: "obs-uuid-001"
 *         technician:
 *           type: string
 *           description: Technician user ID
 *           example: "tech-uuid-001"
 *         observation:
 *           type: string
 *           description: Observation text content
 *           example: "Se detectó presencia de plagas en el sector norte del lote"
 *         agroactivity:
 *           type: string
 *           description: Agro-activity ID
 *           example: "activity-uuid-001"
 *         date:
 *           type: string
 *           description: Date of creation (auto-generated, format dd/mm/yyyy)
 *           example: "25/2/2026"
 */

export default router;
