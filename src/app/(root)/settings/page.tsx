"use client";

import { LogoutButton } from "@/src/components/authentication/LogoutButton";
import { AppearanceTab } from "@/src/components/settings/AppearanceTab";
import { DangerZone } from "@/src/components/settings/DangerZone";
import { DocumentsTab } from "@/src/components/settings/DocumentsTab";
import { HistoryTab } from "@/src/components/settings/HistoryTab";
import { ProfileTab } from "@/src/components/settings/ProfileTab";
import { SubscriptionTab } from "@/src/components/settings/SubscriptionTab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Clock, CreditCard, FileText, Sun, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: "var(--font-bodoni)" }}
      >
        Account Settings
      </h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <div className="flex items-center justify-between mb-4">

        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden md:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Subscription</span>
          </TabsTrigger>
        </TabsList>
          <LogoutButton />
        </div>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="subscription">
          <SubscriptionTab />
        </TabsContent>
      </Tabs>

      <DangerZone />
    </div>
  );
}
