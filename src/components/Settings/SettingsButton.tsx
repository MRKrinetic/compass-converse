
import React from 'react';
import { Settings } from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';

export const SettingsButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button 
        className="flex items-center gap-2 w-full px-3 py-2.5 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground text-left"
        onClick={() => setOpen(true)}
      >
        <Settings className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">Settings</span>
      </button>
      <SettingsDialog open={open} setOpen={setOpen} />
    </>
  );
};
