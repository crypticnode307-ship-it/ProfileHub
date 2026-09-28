import express from "express";
import { createUser, getUserData , login} from "../controllers/usersController.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", login);
router.get("/", authUser, getUserData);
export default router;