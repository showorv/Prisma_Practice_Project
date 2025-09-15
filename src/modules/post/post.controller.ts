import { Request, Response } from "express";
import { postService } from "./post.service";



const createPost = async (req: Request, res: Response)=>{

    try {
        const result = await postService.createPost(req.body)

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}
const getAllPost = async (req: Request, res: Response)=>{

    try {
        const result = await postService.getAllPost()

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}

const getPostById = async (req: Request, res: Response)=>{

    try {
        const result = await postService.getPostById(Number(req.params.id))

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}

const updatePost= async (req: Request, res: Response)=>{

    try {
        const result = await postService.updatePost(Number(req.params.id),req.body)

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}

const deletePost = async (req: Request, res: Response)=>{

    try {
        const result = await postService.deletePost(Number(req.params.id))

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}

export const postController = {
   createPost,
   getPostById,
   updatePost,
   deletePost,
   getAllPost
}