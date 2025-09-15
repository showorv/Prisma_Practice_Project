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

const getAllPost = async()=>{
    const result = await prisma.post.findMany({include: { author: true}})

    return result
}

const getPostById = async (id: number) => {
    const result = await prisma.post.findUnique({
        where: { id },
        include: { author: true },
    });

    return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
    return prisma.post.update({ where: { id }, data });
};

const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};

export const postService = {
 createPost,
 getPostById,
 updatePost,
 deletePost,
 getAllPost
}