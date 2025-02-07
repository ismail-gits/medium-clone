import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono, Context } from "hono"

// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL: string
//   }
// }>


export const prismaMiddleware = async (c: Context, next: Function) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  c.set("prisma", prisma)

  await next()
}