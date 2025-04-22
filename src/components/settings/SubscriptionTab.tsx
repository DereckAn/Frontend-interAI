"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { BillingHistory } from "./BillingHistory";
import { PaymentMethod } from "./PaymentMethod";
import { SubscriptionDetails } from "./SubscriptionDetails";

export function SubscriptionTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <SubscriptionDetails />
          <PaymentMethod />
          <BillingHistory />
        </div>
      </CardContent>
    </Card>
  );
}
