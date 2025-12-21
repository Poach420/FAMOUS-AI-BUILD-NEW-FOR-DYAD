import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { showSuccess } from "@/utils/toast";

export interface ProjectConfig {
  projectName: string;
  framework: string;
  typescript: boolean;
  linting: boolean;
  formatting: boolean;
  port: string;
}

interface ConfigurePanelProps {
  config?: ProjectConfig;
  onSave?: (config: ProjectConfig) => void;
}

const ConfigurePanel = ({ 
  config: initialConfig,
  onSave 
}: ConfigurePanelProps) => {
  const [config, setConfig] = useState<ProjectConfig>(initialConfig || {
    projectName: "my-app",
    framework: "react",
    typescript: true,
    linting: true,
    formatting: true,
    port: "3000",
  });

  const handleSave = () => {
    onSave?.(config);
    showSuccess("Configuration saved successfully");
  };

  const updateConfig = <K extends keyof ProjectConfig>(key: K, value: ProjectConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Configure</CardTitle>
        <CardDescription>Customize your project settings</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={config.projectName}
                onChange={(e) => updateConfig('projectName', e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            {/* Framework Selection */}
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select 
                value={config.framework} 
                onValueChange={(value) => updateConfig('framework', value)}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Development Port */}
            <div className="space-y-2">
              <Label htmlFor="port">Development Port</Label>
              <Input
                id="port"
                type="number"
                value={config.port}
                onChange={(e) => updateConfig('port', e.target.value)}
                placeholder="3000"
              />
            </div>

            {/* TypeScript Toggle */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="typescript" className="cursor-pointer">
                  TypeScript
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enable TypeScript for type safety
                </p>
              </div>
              <Switch
                id="typescript"
                checked={config.typescript}
                onCheckedChange={(checked) => updateConfig('typescript', checked)}
              />
            </div>

            {/* Linting Toggle */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="linting" className="cursor-pointer">
                  ESLint
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enable linting for code quality
                </p>
              </div>
              <Switch
                id="linting"
                checked={config.linting}
                onCheckedChange={(checked) => updateConfig('linting', checked)}
              />
            </div>

            {/* Formatting Toggle */}
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="formatting" className="cursor-pointer">
                  Prettier
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enable automatic code formatting
                </p>
              </div>
              <Switch
                id="formatting"
                checked={config.formatting}
                onCheckedChange={(checked) => updateConfig('formatting', checked)}
              />
            </div>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full">
              Save Configuration
            </Button>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ConfigurePanel;
