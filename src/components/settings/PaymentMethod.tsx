import { Button } from "@/src/components/ui/button";
import { CreditCard } from "lucide-react";

export function PaymentMethod() {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
      <div className="flex items-center justify-between border p-4 rounded-md">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-md mr-4">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium">•••• •••• •••• 4242</h4>
            <p className="text-sm text-gray-500">Expires 12/2025</p>
          </div>
        </div>
        <Button size="sm" variant="outline">
          Update
        </Button>
      </div>
    </div>
  );
}
