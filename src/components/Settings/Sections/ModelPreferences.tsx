
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
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Cpu, Thermometer, Gauge, Map, Hotel, AlertTriangle, ChevronDown } from 'lucide-react';

export const ModelPreferences = () => {
  const [temperature, setTemperature] = React.useState([0.7]);
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          AI Model Selection
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose the AI model that powers your Compass experience.
        </p>
        
        <div className="space-y-3 py-4">
          <Label>LLM Selection</Label>
          <Select defaultValue="gpt4o">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deepseek">DeepSeek LLM</SelectItem>
              <SelectItem value="gpt4o">OpenAI GPT-4 Turbo</SelectItem>
              <SelectItem value="custom">Custom Fine-Tuned Model</SelectItem>
              <SelectItem value="lightweight">Lightweight/Fast Mode</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            Different models offer varying capabilities, response quality, and response times.
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Response Behavior
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Fine-tune how the AI generates responses.
        </p>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>AI Temperature: {temperature[0].toFixed(1)}</Label>
              <span className="text-xs text-muted-foreground">
                {temperature[0] < 0.3 ? "More factual" : temperature[0] > 0.7 ? "More creative" : "Balanced"}
              </span>
            </div>
            <Slider 
              value={temperature} 
              min={0} 
              max={1} 
              step={0.1} 
              onValueChange={setTemperature} 
            />
            <p className="text-xs text-muted-foreground">
              Temperature controls how creative vs. factual the AI responses will be. 
              Lower values produce more predictable, factual responses. 
              Higher values allow more creative, varied outputs.
            </p>
          </div>
          
          <div className="space-y-3">
            <Label>Max Tokens per Response</Label>
            <Select defaultValue="1000">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select token limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">500 tokens (shorter)</SelectItem>
                <SelectItem value="1000">1000 tokens (medium)</SelectItem>
                <SelectItem value="2000">2000 tokens (detailed)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Determines the maximum length of AI responses.
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Response Style
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Balance between speed and detail in responses.
        </p>
        
        <div className="py-4">
          <RadioGroup defaultValue="rich">
            <div className="flex items-center space-x-2 border p-3 rounded-md mb-3">
              <RadioGroupItem value="fast" id="fast" />
              <div>
                <Label htmlFor="fast" className="flex items-center gap-1">
                  <span>⚡ Fast</span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Brief, quick responses for simple questions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="rich" id="rich" />
              <div>
                <Label htmlFor="rich" className="flex items-center gap-1">
                  <span>🧠 Rich</span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Detailed, comprehensive responses with more context
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Separator />
      
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="border rounded-md p-3"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="text-lg font-medium">Use Case Optimization</h3>
          <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              <Label>Navigation-Focused Mode</Label>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Prioritize directions, routes, and transportation information
            </p>
            <Switch id="navigation-mode" />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              <Label>Tourist-Focused Mode</Label>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Emphasize sightseeing, accommodations, and local experiences
            </p>
            <Switch id="tourist-mode" />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <Label>Emergency Mode</Label>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Prioritize safety information, emergency services, and rapid assistance
            </p>
            <Switch id="emergency-mode" />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
