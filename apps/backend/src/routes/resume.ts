import resumeController from "@/controllers/resumeController";
import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /api/resume/{exploitationId}:
 *   get:
 *     tags:
 *       - Resume
 *     summary: Generate and send monthly resume to external API
 *     description: >
 *       Builds a summary of agro-activities for the given exploitation
 *       (including activity types, plots, crops, dates, and observations),
 *       then sends it via POST to the external resume API and returns the
 *       external API response.
 *     parameters:
 *       - in: path
 *         name: exploitationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the exploitation to generate the resume for
 *         example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: The month to filter activities by (1-12)
 *         example: 3
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year to filter activities by
 *         example: 2026
 *     responses:
 *       200:
 *         description: Response from the external resume API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing exploitationId parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "exploitationId is required"
 */
router.get("/:exploitationId", resumeController.getResume);

/**
 * @openapi
 * /api/resume/data/{exploitationId}:
 *   get:
 *     tags:
 *       - Resume
 *     summary: Get resume data for a specific exploitation
 *     description: >
 *       Returns a summary of agro-activities for the given exploitation,
 *       including activity types, plots, crops, dates, and observations.
 *       Unlike the /api/resume/{exploitationId} endpoint, this does NOT
 *       send data to the external API — it only returns the built data.
 *     parameters:
 *       - in: path
 *         name: exploitationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the exploitation to get activities for
 *         example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: The month to filter activities by (1-12)
 *         example: 3
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year to filter activities by
 *         example: 2026
 *     responses:
 *       200:
 *         description: The resume data object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResumeData'
 *       400:
 *         description: Missing exploitationId parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "exploitationId is required"
 */
router.get("/data/:exploitationId", resumeController.getResumeData);

/**
 * @openapi
 * components:
 *   schemas:
 *     ResumeObservation:
 *       type: object
 *       properties:
 *         technician:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Full name of the technician
 *               example: "Juan Pérez"
 *         description:
 *           type: string
 *           description: Observation description
 *           example: "Se detectó presencia de plagas en sector norte"
 *     ResumeActivity:
 *       type: object
 *       properties:
 *         activitytype:
 *           type: string
 *           description: Name of the activity type
 *           example: "Fertilización"
 *         plot:
 *           type: string
 *           description: Name of the plot
 *           example: "Lote Norte"
 *         crop:
 *           type: string
 *           description: Name of the crop
 *           example: "Soja"
 *         date_day:
 *           type: string
 *           description: Day of the activity
 *           example: "15"
 *         date_month:
 *           type: string
 *           description: Month of the activity
 *           example: "3"
 *         date_year:
 *           type: string
 *           description: Year of the activity
 *           example: "2026"
 *         responsible:
 *           type: string
 *           description: Responsible person ID
 *           example: "user-uuid-001"
 *         description:
 *           type: string
 *           description: Description of the activity
 *           example: "Aplicación de fertilizante en lote norte"
 *         observations:
 *           type: array
 *           description: List of observations for this activity
 *           items:
 *             $ref: '#/components/schemas/ResumeObservation'
 *     ResumeData:
 *       type: object
 *       properties:
 *         exploitationid:
 *           type: string
 *           description: Exploitation UUID
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *         mes:
 *           type: string
 *           description: Month
 *           example: "3"
 *         anio:
 *           type: string
 *           description: Year
 *           example: "2026"
 *         activities:
 *           type: array
 *           description: List of activities in the resume
 *           items:
 *             $ref: '#/components/schemas/ResumeActivity'
 */

export default router;
