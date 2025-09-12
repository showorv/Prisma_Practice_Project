import { prisma } from "../../config/db"
import { Post, Prisma } from "@prisma/client"

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post>=>{

    const post = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    email: true,
                    name: true,
                    phone: true,
                    picture: true

                }
            }
        }
    })
    return post


}


export const postService = {
 createPost
}