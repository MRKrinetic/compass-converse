
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';

export const SettingsButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Button>
      <SettingsDialog open={open} setOpen={setOpen} />
    </>
  );
};
