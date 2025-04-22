import { Button } from "@/src/components/ui/button";

export function SubscriptionDetails() {
  return (
    <div className="border rounded-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-green-600">Premium Plan</h3>
          <p className="text-sm text-gray-500">
            Billing monthly • Next payment on {new Date().toLocaleDateString()}
          </p>
        </div>
        <span className="text-2xl font-bold">$12.99/mo</span>
      </div>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Features include:</h4>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="mr-2">✓</span> Unlimited practice interviews
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Detailed feedback and analysis
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Resume and cover letter review
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Priority support
          </li>
        </ul>
      </div>

      <div className="mt-6 flex gap-4">
        <Button variant="outline">Change Plan</Button>
        <Button variant="destructive">Cancel Subscription</Button>
      </div>
    </div>
  );
}
