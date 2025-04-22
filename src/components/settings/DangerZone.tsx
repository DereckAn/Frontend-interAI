import { Button } from "@/src/components/ui/button";
import { LogOut } from "lucide-react";

export function DangerZone() {
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h2>
      <div className="flex flex-wrap gap-4">
        <Button variant="destructive" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Delete Account
        </Button>
      </div>
    </div>
  );
}
