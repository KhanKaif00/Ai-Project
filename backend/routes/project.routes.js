import { Router } from "express";
import * as projectcontroller from "../controllers/project.controller.js"; // Ensure the path is correct
import { body } from "express-validator";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/create",
  body("name").isString().withMessage("Name is required"),
  authMiddleware.authUser,
  projectcontroller.createProjectController
);
router.get("/all", authMiddleware.authUser, projectcontroller.getAllProjects);
router.put(
    "/add-user",
    authMiddleware.authUser,
    body("projectId").isString().withMessage("Project ID is required"),
    body("users")
      .isArray({ min: 1 })
      .withMessage("Users must be an array of strings")
      .custom((users) => {
        if (!users.every((user) => typeof user === "string")) {
          throw new Error("Each user must be a string");
        }
        return true;
      }),
    projectcontroller.addUserToProject
  );
  router.get('/get-project/:projectId',projectcontroller.getProjectById)
  

export default router;
