import activityController from "@/controllers/activityController";
import { Router } from "express";
import { authenticateJWT } from "@/middleware/auth.middleware";

const router = Router();

/**
 * @openapi
 * /api/activity:
 *   post:
 *     tags:
 *       - Activity
 *     summary: Create an activity
 *     description: Creates a new agro-activity record linked to a plot, crop, and activity type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateActivityRequest'
 *     responses:
 *       200:
 *         description: The created activity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */
router.post("/", activityController.createActivity);

/**
 * @openapi
 * /api/activity/{producerid}:
 *   get:
 *     tags:
 *       - Activity
 *     summary: Get activities by producer
 *     description: Returns all agro-activity records belonging to the given producer.
 *     parameters:
 *       - in: path
 *         name: producerid
 *         required: true
 *         schema:
 *           type: string
 *         description: The producer ID to filter activities by
 *         example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *     responses:
 *       200:
 *         description: A list of activities for the given producer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 */
router.get("/:producerid",authenticateJWT, activityController.getActivities);

/**
 * @openapi
 * /api/activity/form-options/{producerid}:
 *   get:
 *     tags:
 *       - Activity
 *     summary: Get form options for activity creation
 *     description: >
 *       Returns the available plots, crops, and activity types for the given producer.
 *       Used to populate dropdowns in the activity creation form.
 *     parameters:
 *       - in: path
 *         name: producerid
 *         required: true
 *         schema:
 *           type: string
 *         description: The producer ID to filter options by
 *         example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *     responses:
 *       200:
 *         description: Form options for activity creation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActivityFormOptionsResponse'
 */
router.get("/form-options/:producerid",authenticateJWT, activityController.getFormOptions);

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateActivityRequest:
 *       type: object
 *       required:
 *         - plot
 *         - crop
 *         - activitytype
 *         - responsible
 *         - description
 *       properties:
 *         plot:
 *           type: string
 *           description: Plot ID
 *           example: "plot-uuid-001"
 *         crop:
 *           type: string
 *           description: Crop ID
 *           example: "crop-uuid-001"
 *         activitytype:
 *           type: string
 *           description: Activity type ID
 *           example: "acttype-uuid-001"
 *         responsible:
 *           type: string
 *           description: Responsible person ID
 *           example: "user-uuid-001"
 *         date_year:
 *           type: integer
 *           description: Year of the activity (optional)
 *           example: 2026
 *         date_month:
 *           type: integer
 *           description: Month of the activity (optional, 1-12)
 *           example: 2
 *         date_day:
 *           type: integer
 *           description: Day of the activity (optional, 1-31)
 *           example: 25
 *         description:
 *           type: string
 *           description: Description of the activity
 *           example: "Aplicación de fertilizante en lote norte"
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated UUID
 *           example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         plot:
 *           type: string
 *           description: Plot ID
 *           example: "plot-uuid-001"
 *         crop:
 *           type: string
 *           description: Crop ID
 *           example: "crop-uuid-001"
 *         activitytype:
 *           type: string
 *           description: Activity type ID
 *           example: "acttype-uuid-001"
 *         responsible:
 *           type: string
 *           description: Responsible person ID
 *           example: "user-uuid-001"
 *         date_year:
 *           type: integer
 *           nullable: true
 *           example: 2026
 *         date_month:
 *           type: integer
 *           nullable: true
 *           example: 2
 *         date_day:
 *           type: integer
 *           nullable: true
 *           example: 25
 *         description:
 *           type: string
 *           example: "Aplicación de fertilizante en lote norte"
 *     ActivityFormOptionsResponse:
 *       type: object
 *       properties:
 *         plots:
 *           type: array
 *           description: Available plots for the producer
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "plot-uuid-001"
 *               name:
 *                 type: string
 *                 example: "Lote Norte"
 *         crops:
 *           type: array
 *           description: Available crops for the producer
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "crop-uuid-001"
 *               name:
 *                 type: string
 *                 example: "Soja"
 *         activitytypes:
 *           type: array
 *           description: All available activity types
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "acttype-uuid-001"
 *               name:
 *                 type: string
 *                 example: "Fertilización"
 */

export default router;
