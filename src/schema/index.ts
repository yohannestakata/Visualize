import * as z from "zod";

export const RegisterSchema = z.object({
  nickname: z.string().min(1, { message: "Please pick a nickname" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password needs to be atleast 8 characters" }),
  uniId: z.string().min(1, { message: "Please enter a valid University ID" }),
  department: z.string().min(1, { message: "Please select a department" }),
});

export const LoginSchema = z.object({
  uniId: z.string().min(1, { message: "Please enter a valid University ID" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export const UploadModelSchema = z.object({});
