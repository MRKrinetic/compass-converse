
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Plane, AlertTriangle, Map, FileText, Mail, MessageSquare, SmartphoneIcon } from 'lucide-react';

export const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose which notifications you'd like to receive and how you'd like to receive them.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="notifications-enabled" defaultChecked />
            <Label htmlFor="notifications-enabled">Enable all notifications</Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium">Notification Types</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select which types of notifications you want to receive.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="travel-alerts">Travel Alerts</Label>
              <p className="text-xs text-muted-foreground ml-1">
                (Flight delays, weather updates)
              </p>
            </div>
            <Switch id="travel-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
              <p className="text-xs text-muted-foreground ml-1">
                (Disasters, health advisories)
              </p>
            </div>
            <Switch id="emergency-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Map className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="poi-suggestions">POI Suggestions</Label>
              <p className="text-xs text-muted-foreground ml-1">
                (Hidden gems, places of interest)
              </p>
            </div>
            <Switch id="poi-suggestions" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="trip-summary">Daily Trip Summary</Label>
              <p className="text-xs text-muted-foreground ml-1">
                (Recap of your day's activities)
              </p>
            </div>
            <Switch id="trip-summary" />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium">Delivery Methods</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose how you want to receive notifications.
        </p>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label>Email Notifications</Label>
            </div>
            <Select defaultValue="important">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select email frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All notifications</SelectItem>
                <SelectItem value="important">Important only</SelectItem>
                <SelectItem value="digest">Daily digest</SelectItem>
                <SelectItem value="none">Don't send emails</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <Label>In-App Notifications</Label>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select in-app notification preferences" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All notifications</SelectItem>
                <SelectItem value="important">Important only</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <SmartphoneIcon className="h-4 w-4 text-muted-foreground" />
              <Label>Push Notifications</Label>
            </div>
            <Select defaultValue="important">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select push notification preferences" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All notifications</SelectItem>
                <SelectItem value="important">Important only</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
