import * as z from "zod";

// Validaciones comunes
const emailSchema = z.string().email({ message: "Required" });
const passwordSchema = z
  .string()
  .min(6, { message: "At least 6 characters long" })
  .max(100, { message: "Too long" });
const nameSchema = z
  .string()
  .min(2, { message: "At least 2 characters long" })
  .max(100, { message: "Too long" });

const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers and underscores",
  });

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    // username: usernameSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",   
    path: ["confirmPassword"],
  });

export const ChangePasswordFormSchema = z.object({
  password: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
});

export const NewInventoryFormSchema = z.object({
  name: nameSchema,
});
