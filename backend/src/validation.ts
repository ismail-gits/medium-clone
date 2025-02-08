import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  name: z.string().optional(),
  password: z.string().min(6, {message: "Password should of atleast 6 characters"})
})

export const signinSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  password: z.string()
})

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional(),
})

export const updateBlogSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
})

export const idSchema = z.string()

// type inference in zod
export type signupType = z.infer<typeof signupSchema> 
export type signinType = z.infer<typeof signinSchema>
export type createBlogType = z.infer<typeof createBlogSchema>
export type updateBlogtype = z.infer<typeof updateBlogSchema>
export type idType = z.infer<typeof idSchema>