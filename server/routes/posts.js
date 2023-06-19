import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  getUserFriendsPost,
} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
router.get("/:userId/friend", getUserFriendsPost);
router.post("/:userId/posts", createPost);
/* UPDATE */
router.patch("/:id/like", likePost);

export default router;
