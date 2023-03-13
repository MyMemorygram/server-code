import express from "express";
import { getPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getPosts);
router.get("/myPosts", verifyToken, getPosts);

export default router;