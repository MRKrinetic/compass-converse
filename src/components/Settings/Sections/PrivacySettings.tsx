
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { History, MapPin, FileDown, ShieldCheck, Key } from 'lucide-react';

export const PrivacySettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <History className="h-5 w-5" />
          History & Search Data
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your saved trips and search history.
        </p>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label>Your saved history helps us improve recommendations</Label>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Save search history for better recommendations
              </p>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="pt-2">
            <Button variant="outline" className="w-full">
              Clear All History
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This will permanently delete all of your search history and saved trips.
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Sharing
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Control how and when your location information is used.
        </p>
        
        <div className="space-y-3 py-4">
          <Label>Location Access</Label>
          <Select defaultValue="ask">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose location access level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="always">Always Allow</SelectItem>
              <SelectItem value="ask">Ask Every Time</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Location data helps us provide accurate travel recommendations and emergency services.
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <FileDown className="h-5 w-5" />
          Data Export
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Download your personal data in a portable format.
        </p>
        
        <div className="py-4">
          <Button variant="outline">
            Export Your Data
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Download all your personal data in a machine-readable format.
            This process may take a few minutes to complete.
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Two-Factor Authentication
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add an extra layer of security to your account.
        </p>
        
        <div className="flex items-center justify-between py-4">
          <div>
            <Label htmlFor="enable-2fa">Enable 2FA</Label>
            <p className="text-sm text-muted-foreground">
              Use an authenticator app to verify your identity
            </p>
          </div>
          <Switch id="enable-2fa" />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Key Management
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage API keys for advanced integration.
        </p>
        
        <div className="py-4">
          <Button variant="outline">
            Generate New API Key
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            For advanced users. API keys allow you to integrate Compass AI with other services.
          </p>
        </div>
      </div>
    </div>
  );
};
