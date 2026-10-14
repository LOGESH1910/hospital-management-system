"use client";

import { Button } from "@/components/ui/buttons/button";
import { Card } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badges/badge";
import { Shield, Bell, Database, Lock } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage platform settings and configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <h3 className="font-semibold flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Security</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
              </div>
              <Badge variant="primary">30 minutes</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">IP Whitelisting</p>
                <p className="text-xs text-muted-foreground">Restrict admin access by IP</p>
              </div>
              <Badge variant="warning">Configured</Badge>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <h3 className="font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notifications</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive email alerts for events</p>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-xs text-muted-foreground">SMS for urgent notifications</p>
              </div>
              <Badge variant="warning">Disabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Browser push notifications</p>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <h3 className="font-semibold flex items-center gap-2"><Database className="h-4 w-4 text-primary" /> Database</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">Backup Schedule</p>
                <p className="text-xs text-muted-foreground">Daily automatic backups</p>
              </div>
              <Badge variant="success">Daily</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">Data Encryption</p>
                <p className="text-xs text-muted-foreground">AES-256 encryption at rest</p>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
            <Button variant="primary" size="sm">Run Backup Now</Button>
          </div>
        </Card>

        <Card className="shadow-sm">
          <div className="border-b border-border p-4">
            <h3 className="font-semibold flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Privacy</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">GDPR Compliance</p>
                <p className="text-xs text-muted-foreground">Patient data protection</p>
              </div>
              <Badge variant="success">Compliant</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">Data Retention</p>
                <p className="text-xs text-muted-foreground">7 years medical records</p>
              </div>
              <Badge variant="primary">Configured</Badge>
            </div>
            <Button variant="outline" size="sm">Export Data</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}