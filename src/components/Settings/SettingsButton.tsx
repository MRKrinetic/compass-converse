
import React from 'react';
import { Settings } from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';

export const SettingsButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div 
        className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground"
        onClick={() => setOpen(true)}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </div>
      <SettingsDialog open={open} setOpen={setOpen} />
    </>
  );
};
