import { Hono } from "hono";
import { createBlogSchema, CreateBlogType, updateBlogSchema, UpdateBlogtype } from "@ismaildevzone/medium-commons";
import { getPrisma } from "../index";
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    id: string
  }
}>

// middleware to authenticate via jwt token
blogRouter.use('*', async (c, next) => {
  const authHeader = c.req.header("Authorization") || ""

  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({message: "Invalid authorization token"}, 403)
  }

  const token = authHeader?.split(" ")[1]

  try {
    const payload = await verify(token, c.env.JWT_SECRET)

    if (!payload?.id) {
      return c.json({ message: "Invalid authorization token" }, 403);
    }

    c.set('jwtPayload', payload)

    await next()
  }
  catch(err) {
    console.log(err);
    return c.json({message: "Invalid authorization token"}, 403)
  }
})

// creates new blog
blogRouter.post('/', async (c) => {
  const body: CreateBlogType = await c.req.json()

  const { success, data } = createBlogSchema.safeParse(body)
  if (!success) {
    return c.json({message: "Invalid data"}, 400)
  }

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const response = await prisma.blog.create({
      data: {
        authorId: c.get('jwtPayload').id,
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail
      },
      select: {
        id: true
      }
    })
    return c.json(response, 200)
  }
  catch(err) {
    console.log(err);
    c.json({message: "Unable to create the blog post"}, 400)
  }
})

// update data of blog
// either title or content or thumbnail or everything
blogRouter.put('/', async (c) => {
  const body: UpdateBlogtype = await c.req.json()

  const { success, data } = updateBlogSchema.safeParse(body)
  if (!success) {
    return c.json({message: "Invalid data"}, 400)
  }

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const response = await prisma.blog.update({
      where: {
        id: data.id
      },
      data: data,
      select: {
        title: true,
        content: true,
        thumbnail: true
      }
    })
    return c.json({"Updated blog": response}, 200)
  }
  catch(err) {
    console.log(err);
    c.json({message: "Unable to update the blog post"}, 400)
  }
})

// get all blogs
// Need to add pagination => Meaning we send 10 blogs first and when the user scroll we keeping sending more and more
blogRouter.get('/bulk', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        content: true,
        thumbnail: true
      }
    })

    return c.json(blogs, 200)
  }
  catch(err) {
    console.log(err);
    return c.json({message: "Unable to fetch blogs from database"}, 400)
  }
})

// gets the blog 
blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id")

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id
      },
      select: {
        title: true,
        content: true,
        thumbnail: true
      }
    })

    if (!blog) {
      return c.json({message: "Invalid blog id"}, 403)
    }

    return c.json(blog, 200)
  }
  catch(err) {
    console.log(err);
    return c.json({message: "Unable to fetch blog from database"}, 400)
  }
})

