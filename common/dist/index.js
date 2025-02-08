"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Please enter a valid email" }),
    name: zod_1.z.string().optional(),
    password: zod_1.z.string().min(6, { message: "Password should of atleast 6 characters" })
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Please enter a valid email" }),
    password: zod_1.z.string()
});
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    thumbnail: zod_1.z.string().optional(),
});
exports.updateBlogSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    thumbnail: zod_1.z.string().optional(),
});
