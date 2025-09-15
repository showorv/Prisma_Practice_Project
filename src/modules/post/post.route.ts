import express from "express"
import { postController } from "./post.controller"


const router = express.Router()

router.post ("/", postController.createPost)
router.get ("/", postController.getAllPost)
router.get ("/:id", postController.getPostById)
router.patch ("/:id", postController.updatePost)
router.delete ("/:id", postController.deletePost)
// router.get ("/", userController.getAllUser)

// router.get ("/:id", userController.getSingleUserbyId)

export const postRouter = router