
import React from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageSquare, Volume2, Globe, Ruler } from 'lucide-react';

export const AIPersonalization = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Personality
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose how you want Compass AI to communicate with you.
        </p>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>AI Tone</Label>
            <Select defaultValue="friendly">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="travel-suggestions">Travel Suggestions</Label>
              <p className="text-sm text-muted-foreground">
                Get automatic travel suggestions based on your conversations
              </p>
            </div>
            <Switch id="travel-suggestions" defaultChecked />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Voice & Audio
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configure voice assistant settings for future voice capabilities.
        </p>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <Label htmlFor="voice-replies">AI Voice Replies</Label>
            <p className="text-sm text-muted-foreground">
              Enable voice responses from Compass AI
            </p>
          </div>
          <Switch id="voice-replies" />
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Language & Region
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose your preferred language and regional settings.
        </p>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Ruler className="h-5 w-5" />
          Units of Measurement
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set your preferred units for distance and temperature.
        </p>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <Label>Distance</Label>
            <RadioGroup defaultValue="km">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="km" id="km" />
                <Label htmlFor="km">Kilometers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="miles" id="miles" />
                <Label htmlFor="miles">Miles</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label>Temperature</Label>
            <RadioGroup defaultValue="celsius">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="celsius" id="celsius" />
                <Label htmlFor="celsius">Celsius</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fahrenheit" id="fahrenheit" />
                <Label htmlFor="fahrenheit">Fahrenheit</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
