import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUsersName,
  updateProfile,
} from "../controllers/users.js";

const router = express.Router();

/* READ */
router.get("/:id", getUser);
router.get("/:id/friends", getUserFriends);
router.get("/", getUsersName);

/* UPDATE */
router.patch("/:id/:friendId", addRemoveFriend);
router.patch("/:id/update", updateProfile);

export default router;
