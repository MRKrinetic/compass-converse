
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { SunMoon, Palette, Type, Zap } from 'lucide-react';

export const ThemeSettings = () => {
  // Mock colors for accent color selection
  const accentColors = [
    { name: "Blue", value: "#1E90FF", class: "bg-blue-500" },
    { name: "Green", value: "#10B981", class: "bg-green-500" },
    { name: "Purple", value: "#8B5CF6", class: "bg-purple-500" },
    { name: "Pink", value: "#EC4899", class: "bg-pink-500" },
    { name: "Orange", value: "#F97316", class: "bg-orange-500" },
    { name: "Teal", value: "#14B8A6", class: "bg-teal-500" },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <SunMoon className="h-5 w-5" />
          Theme Mode
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose between light and dark mode.
        </p>
        
        <div className="grid gap-4 py-4">
          <RadioGroup defaultValue="system">
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light Mode</Label>
              </div>
              <div className="h-6 w-6 rounded-full bg-slate-100 border"></div>
            </div>
            
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark Mode</Label>
              </div>
              <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700"></div>
            </div>
            
            <div className="flex items-center justify-between space-x-2 border p-4 rounded-md">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System Preference</Label>
              </div>
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-slate-100 to-slate-800 border"></div>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Accent Color
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose an accent color for buttons and interactive elements.
        </p>
        
        <div className="py-4">
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color.value}
                className={`h-10 w-10 rounded-full ${color.class} border border-slate-200 shadow-sm hover:scale-110 transition-transform`}
                title={color.name}
                aria-label={`Select ${color.name} as accent color`}
              />
            ))}
            <button
              className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 border border-slate-200 shadow-sm hover:scale-110 transition-transform"
              title="Custom gradient"
              aria-label="Select custom gradient as accent color"
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Type className="h-5 w-5" />
          UI Density & Accessibility
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Adjust the interface to your preferences.
        </p>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>UI Density</Label>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact">Compact</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable">Comfortable</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="larger-fonts">Larger Fonts</Label>
                <p className="text-sm text-muted-foreground">
                  Increase text size throughout the app
                </p>
              </div>
              <Switch id="larger-fonts" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enhance visual distinction between elements
                </p>
              </div>
              <Switch id="high-contrast" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reduce-motion">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations throughout the app
                </p>
              </div>
              <Switch id="reduce-motion" />
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Beta Features
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Try experimental features before they're fully released.
        </p>
        
        <div className="flex items-center justify-between py-4">
          <div>
            <Label htmlFor="beta-features">Opt-in to Beta Features</Label>
            <p className="text-sm text-muted-foreground">
              Get early access to new Compass AI capabilities
            </p>
          </div>
          <Switch id="beta-features" />
        </div>
      </div>
    </div>
  );
};
