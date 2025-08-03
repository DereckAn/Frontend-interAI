"use client";

import { Button } from "@/src/components/ui/button";
import { useSession } from "next-auth/react";

export function ProfileForm() {
  const { data: session } = useSession();

  return (
    <div className="flex-1 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            defaultValue={session?.user?.name || ""}
            className="w-full p-2 rounded-md bg-gray2/10 dark:bg-gray2/30"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={session?.user?.email || ""}
            className="w-full p-2 rounded-md bg-gray2/10 dark:bg-gray2/30"
          />
        </div>
      </div>

      <Button className="mt-4" variant="outline">
        Save Changes
      </Button>
    </div>
  );
}
