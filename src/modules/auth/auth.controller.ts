import { Request, Response } from "express";
import { authService } from "./auth.service";


const login = async (req: Request, res: Response)=>{
    try {
        const result = await authService.login(req.body)

        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
}

export const authController ={
    login
}