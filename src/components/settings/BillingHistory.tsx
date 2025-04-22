import { Button } from "@/src/components/ui/button";

export function BillingHistory() {
  // Mock data
  const billingItems = [1, 2, 3].map((i) => ({
    id: i,
    description: "Premium Plan - Monthly",
    date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000),
    amount: 12.99,
  }));

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Billing History</h3>
      <div className="space-y-4">
        {billingItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium">{item.description}</p>
              <p className="text-sm text-gray-500">
                {item.date.toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">${item.amount.toFixed(2)}</span>
              <Button size="sm" variant="ghost">
                Receipt
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
