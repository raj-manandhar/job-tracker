import { Router } from "express";
import {
  addApplication,
  deleteApplication,
  getapplication,
  getApplications,
  updateApplication,
} from "../controllers/application.controller.js";

const router = Router();

router.get("/", getApplications);

router.get("/:id", getapplication);

router.post("/", addApplication);

router.patch("/:id", updateApplication);

router.delete("/:id", deleteApplication);

export default router;
