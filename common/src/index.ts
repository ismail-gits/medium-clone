
import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  name: z.string().optional(),
  password: z.string().min(6, {message: "Password should of atleast 6 characters"})
})
export type SignupType = z.infer<typeof signupSchema> 


export const signinSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  password: z.string()
})
export type SigninType = z.infer<typeof signinSchema>

export const createBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  thumbnail: z.string().optional(),
})
export type CreateBlogType = z.infer<typeof createBlogSchema>

export const updateBlogSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
})
export type UpdateBlogtype = z.infer<typeof updateBlogSchema>
