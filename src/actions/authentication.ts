"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { loginFormSchema } from "../schema";

export const Login = async (formData: z.infer<typeof loginFormSchema>) => {
  const validatedResult = loginFormSchema.safeParse(formData);

  if (!validatedResult.success) return { error: "Invalid Fields" };
  const { email, password } = validatedResult.data;

  try {
    // Use Next-Auth's signIn directly instead of making a separate API call
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Important: prevent auto-redirect to handle errors
    });

    return { success: "Login successful" };
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An error occurred" };
      }
    }

    return { error: "Error en el proceso de login" };
  }
};
