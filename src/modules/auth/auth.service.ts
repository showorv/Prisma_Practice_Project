import { prisma } from "../../config/db"


const login = async (payload: {email: string, password: string})=>{

    const {email,password} = payload


    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user){
        throw new Error("user not found")
    }

    if(password === user.password){
        return user
    }else{
        throw new Error("password incorrect")
    }
}

export const authService = {
    login
}