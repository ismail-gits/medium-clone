import { Hono } from "hono";
import { signinSchema, SigninType, signupSchema, SignupType } from "@ismaildevzone/medium-commons";
import { sign } from "hono/jwt";
import { getPrisma } from "../index";
import bcrypt from 'bcryptjs'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>

// signup route
userRouter.post('/signup', async (c) => {
  const body: SignupType = await c.req.json()

  const { success, data }  = signupSchema.safeParse(body)
  if (!success) {
    return c.json({message: "Invalid data"}, 400)
  }

  // hashing password using bcrypt with 10 salt rounds
  const hashedPassword = await bcrypt.hash(data.password, 10)

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const response = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword
      },
      select: {
        id: true
      }
    })
    
    const token = await sign(response, c.env.JWT_SECRET)
    
    return c.json({token}, 200)
  }
  catch(err) {
    console.log(err);
    return c.json({message: "email already exists"}, 400)
  }
})

// signin route
userRouter.post('/signin', async (c) => {
  const body: SigninType = await c.req.json()

  const { success, data } = signinSchema.safeParse(body)
  if (!success) {
    return c.json({message: "Invalid data"}, 400)
  }

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email
      },
      select: {
        id: true,
        password: true
      }
    })

    if (!user) {
      return c.json({message: "Invalid email"}, 403)
    }

    // decrypting the password and comparing using bcrypt
    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      return c.json({message: "Invalid password"}, 403)
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({token}, 200)
  }
  catch(err) {
    console.log(err);
    return c.json({message: "Invalid"}, 403)
  }
})