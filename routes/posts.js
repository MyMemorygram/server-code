import express from "express";
import { getPosts, searchPosts, editPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getPosts);
router.get("/", verifyToken, getPosts);

router.get("/:searchStr", verifyToken, searchPosts);

router.post("/edit", verifyToken, editPost);

export default router;