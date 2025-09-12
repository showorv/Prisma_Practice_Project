import express from "express"
import { postController } from "./post.controller"


const router = express.Router()

router.post ("/", postController.createPost)
// router.get ("/", userController.getAllUser)

// router.get ("/:id", userController.getSingleUserbyId)

export const postRouter = router