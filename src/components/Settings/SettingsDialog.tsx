
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AccountSettings } from './Sections/AccountSettings';
import { AIPersonalization } from './Sections/AIPersonalization';
import { NotificationSettings } from './Sections/NotificationSettings';
import { PrivacySettings } from './Sections/PrivacySettings';
import { ThemeSettings } from './Sections/ThemeSettings';
import { ModelPreferences } from './Sections/ModelPreferences';

interface SettingsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SettingsDialog({ open, setOpen }: SettingsDialogProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-lg w-full p-0 h-full flex flex-col" side="right">
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <SheetTitle className="text-xl">Settings</SheetTitle>
        </SheetHeader>
        
        <Tabs defaultValue="account" className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b flex-shrink-0">
            <TabsList className="px-4 h-12 justify-start">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="ai">AI & Chat</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="px-6 py-4 pb-20">
              <TabsContent value="account" className="mt-0 focus-visible:outline-none">
                <AccountSettings />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0 focus-visible:outline-none">
                <AIPersonalization />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 focus-visible:outline-none">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0 focus-visible:outline-none">
                <PrivacySettings />
              </TabsContent>
              
              <TabsContent value="theme" className="mt-0 focus-visible:outline-none">
                <ThemeSettings />
              </TabsContent>
              
              <TabsContent value="advanced" className="mt-0 focus-visible:outline-none">
                <ModelPreferences />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
