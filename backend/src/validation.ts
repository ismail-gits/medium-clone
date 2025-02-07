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

export type signupType = z.infer<typeof signupSchema> 
export type signinType = z.infer<typeof signinSchema>