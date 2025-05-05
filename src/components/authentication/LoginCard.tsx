"use client";

import { loginFormSchema } from "@/src/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react"; // Use this import for client-side
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { OauthButons } from "./OauthButtons";

interface FormData extends z.infer<typeof loginFormSchema> {}

export const LoginCard = ({ onToggleView }: { onToggleView: () => void }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      toast.loading("Signing in...");

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/fill_information",
      });

      if (result?.error) {
        toast.dismiss();
        toast.error("Invalid email or password");
        return;
      }

      toast.dismiss();
      toast.success("Signed in successfully");
      router.push("/fill_information");
      reset();
    } catch (error) {
      console.error("Login error:", error);
      toast.dismiss();
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Welcome back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              placeholder="email@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {String(errors.password.message)}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full hover:bg-gray2/40 hover:text-background"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <OauthButons/>
        
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={onToggleView}
            className="text-primary hover:underline"
          >
            Sign up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};
