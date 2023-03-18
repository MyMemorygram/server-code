import express from "express";
import { getPosts, searchPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getPosts);
router.get("/:userId", verifyToken, getPosts);

router.get("/:userId/:searchStr", verifyToken, searchPosts);

export default router;