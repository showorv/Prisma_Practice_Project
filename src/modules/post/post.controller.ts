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

export const postController = {
   createPost
}