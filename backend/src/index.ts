import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono()

// sets the DATABASE_URL as datasourceUrl and returns a new prismaClient
export const getPrisma = (DATABASE_URL: string) => {
  return new PrismaClient({
    datasourceUrl: DATABASE_URL
  }).$extends(withAccelerate())
}

app.use('/*', cors())

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)


export default app