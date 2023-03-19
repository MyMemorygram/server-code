import express from "express";
import { getPosts, searchPosts, editPost, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getPosts);
router.get("/", verifyToken, getPosts);

router.get("/:searchStr", verifyToken, searchPosts);

router.post("/edit", verifyToken, editPost);

router.delete("/", verifyToken, deletePost);

export default router;