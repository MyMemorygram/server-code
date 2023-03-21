import express from "express";
import { createBucketListItem, getBucketListItems, deleteBucketListItem, updateBucketListItem } from "../controllers/bucketlist.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getBucketListItems);

router.post("/", verifyToken, createBucketListItem);

router.post("/:id", verifyToken, updateBucketListItem);

router.delete("/:id", verifyToken, deleteBucketListItem);

export default router;