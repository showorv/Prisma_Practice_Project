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

const getAllPost = async( {
    page, limit,search, isFeatured,tags
} : { page: number, limit: number, search?: string, isFeatured?: boolean, tags?: string[]})=>{

    const skip = (page - 1)* limit;

    const where:any = {
        AND: [
            search && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode:"insensitive"
                        }
                    },
                    {
                        content: {
                            contains: search,
                            mode:"insensitive"
                        }
                    }
                    
                ]
            },

            typeof isFeatured === "boolean" && {isFeatured},

           (tags && tags?.length > 0) && {
                tags: {hasEvery: tags} // hasEvery in prisma likes loop for array
            }
        ].filter(Boolean)
       
    }
    
    const result = await prisma.post.findMany(
        {
            skip,
            take: limit,
            where,
            orderBy: {
                createdAt: "desc"
            },
       
        include:
             { 
                author: {
                    select: {
                        email: true,
                        name: true,
                        phone: true,
                        picture: true
    
                    }
                }
            
            }
            }
        
        )

        const total = await prisma.post.count({where})

    return {
        data: result,
        metaData: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    }
}

const getPostById = async (id: number) => {

    // here comes transaction because two are dependent

    const result = await prisma.$transaction(async (tx)=>{

        await tx.post.update({
            where: {
                id
            },
            data: {
                view: {
                    increment: 1
                }
            }
        })
        const data = await tx.post.findUnique({
            where: { id },
            include:
            { 
               author: {
                   select: {
                       email: true,
                       name: true,
                       phone: true,
                       picture: true
   
                   }
               }
           
           }
        });

        return data
    })

   

    return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
    return prisma.post.update({ where: { id }, data });
};

const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};


// aggregation

const getBlogStats = async()=>{

    return await prisma.$transaction(async(tx)=>{

        const aggregates = await tx.post.aggregate({
            _count: true,
             _sum: {view: true},
             _avg: {view: true},
             _max: {view: true}
        })

        const featuredCount = await tx.post.count({
            where: {isFeatured: true}
        })

        const topFeatured = await tx.post.findFirst({
            where: {isFeatured: true},
            orderBy: { view: "desc"}
        })

        const lastweek = new Date()
        lastweek.setDate(lastweek.getDate() - 7)

        const lastWeekPostCount = await tx.post.count({
            where: {createdAt: {
                gte: lastweek
            }}
        })

        return {
            stats: {

                totalPost: aggregates._count,
                totalViews: aggregates._sum.view,
                AvgViews: aggregates._avg.view,
                maxView: aggregates._max.view
            },
            featured: {
                totalFeatured: featuredCount,
                topFeatured: topFeatured
            },
            lastWeekCount: lastWeekPostCount
        }
    })

    
}

export const postService = {
 createPost,
 getPostById,
 updatePost,
 deletePost,
 getAllPost,
 getBlogStats
}