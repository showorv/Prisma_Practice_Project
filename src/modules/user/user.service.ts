import { prisma } from "../../config/db"
import { Prisma, User } from "@prisma/client"

const createUser = async (payload: Prisma.UserCreateInput): Promise<User>=>{

    const users = await prisma.user.create({
        data: payload
    })
    return users


}

const getAllUser = async ()=>{

    const all = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            status: true,
            role: true,
            phone: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            post: true // if we use select then dont need include
          

            // only we dont want password
        },
        orderBy: {
            id: "desc"
        },
        // include: {  // for populate
        //   post: true, 
        // },
    })

    return all
}

const getSingleUserbyId = async (id: number)=>{

    const single = await prisma.user.findUnique({
        where: {
            id
        }
    })

    return single
}

export const userService = {
    createUser,
    getAllUser,
    getSingleUserbyId
}