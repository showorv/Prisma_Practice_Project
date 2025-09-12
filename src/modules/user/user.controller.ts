import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response)=>{

    try {
        const result = await userService.createUser(req.body)

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}
const getAllUser = async (req: Request, res: Response)=>{

    try {
        const result = await userService.getAllUser()

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}

const getSingleUserbyId = async (req: Request, res: Response)=>{

    try {
        const id = req.params.id 
        const result = await userService.getSingleUserbyId(Number(id))

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}

export const userController = {
    createUser,
    getAllUser,
    getSingleUserbyId
}