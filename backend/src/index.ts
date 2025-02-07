import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupSchema, signupType, signinSchema, signinType } from './validation'
import { sign, verify, decode } from 'hono/jwt'
import bcrypt from 'bcryptjs'

// store this as well in wrangler.json file
// const JWT_SECRET = ""

// binding string type to DATABASE_URL
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>

// sets the DATABASE_URL as datasourceUrl and returns a new prismaClient
const getPrisma = (DATABASE_URL: string) => {
  return new PrismaClient({
    datasourceUrl: DATABASE_URL
  }).$extends(withAccelerate())
}

// signup route
app.post('/api/v1/user/signup', async (c) => {
  const body: signupType = await c.req.json()

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
app.post('/api/v1/user/signin', async (c) => {
  const body: signinType = await c.req.json()

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

app.post('/api/v1/blog', async (c) => {
  
})

app.put('/api/v1/blog', async (c) => {
  
})

app.get('/api/v1/blog/:id', async (c) => {
  
})

app.get('/api/v1/user/bluk', async (c) => {
  
})

export default app