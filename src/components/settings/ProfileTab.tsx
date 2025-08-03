"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Upload, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PasswordForm } from "./PasswordForm";
import { ProfileForm } from "./ProfileForm";

export function ProfileTab() {
  const [isUploading, setIsUploading] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <Card className="bg-gray2/10 dark:bg-gray2/30">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 ">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() => setIsUploading(true)}
              >
                <Upload className="h-4 w-4 " />
              </Button>
            </div>

            <ProfileForm />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray2/10 dark:bg-gray2/30 ">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to secure your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
