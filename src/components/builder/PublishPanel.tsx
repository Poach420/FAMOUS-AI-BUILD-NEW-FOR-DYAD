import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";
import { Github, Download, Cloud } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PublishPanelProps {
  onPublish?: (options: PublishOptions) => void;
  onExport?: () => void;
}

export interface PublishOptions {
  platform: "github" | "vercel" | "netlify" | "local";
  repoName?: string;
  repoDescription?: string;
  isPrivate: boolean;
  autoCommit: boolean;
}

const PublishPanel = ({ onPublish, onExport }: PublishPanelProps) => {
  const [platform, setPlatform] = useState<PublishOptions['platform']>("github");
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [autoCommit, setAutoCommit] = useState(true);

  const handlePublish = () => {
    if (platform === "github" && !repoName.trim()) {
      showError("Repository name is required for GitHub publishing");
      return;
    }

    const options: PublishOptions = {
      platform,
      repoName: repoName.trim() || undefined,
      repoDescription: repoDescription.trim() || undefined,
      isPrivate,
      autoCommit,
    };

    onPublish?.(options);
    showSuccess(`Publishing to ${platform}...`);
  };

  const handleExport = () => {
    onExport?.();
    showSuccess("Exporting project files...");
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Publish</CardTitle>
        <CardDescription>Deploy your app or export the source code</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {/* Platform Selection */}
            <div className="space-y-2">
              <Label htmlFor="platform">Publish Platform</Label>
              <Select value={platform} onValueChange={(value: any) => setPlatform(value)}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="github">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      <span>GitHub</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="vercel">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      <span>Vercel</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="netlify">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      <span>Netlify</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="local">
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Export Locally</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* GitHub Options */}
            {platform === "github" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="repoName">Repository Name *</Label>
                  <Input
                    id="repoName"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    placeholder="my-awesome-app"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repoDescription">Repository Description</Label>
                  <Textarea
                    id="repoDescription"
                    value={repoDescription}
                    onChange={(e) => setRepoDescription(e.target.value)}
                    placeholder="A brief description of your project"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="isPrivate" className="cursor-pointer">
                      Private Repository
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Make this repository private
                    </p>
                  </div>
                  <Switch
                    id="isPrivate"
                    checked={isPrivate}
                    onCheckedChange={setIsPrivate}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoCommit" className="cursor-pointer">
                      Auto Commit
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically commit changes
                    </p>
                  </div>
                  <Switch
                    id="autoCommit"
                    checked={autoCommit}
                    onCheckedChange={setAutoCommit}
                  />
                </div>
              </>
            )}

            {/* Cloud Platform Info */}
            {(platform === "vercel" || platform === "netlify") && (
              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-sm font-medium">Deployment Info</p>
                <p className="text-sm text-muted-foreground">
                  Your app will be deployed to {platform === "vercel" ? "Vercel" : "Netlify"} with 
                  automatic builds and HTTPS enabled.
                </p>
              </div>
            )}

            {/* Local Export Info */}
            {platform === "local" && (
              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-sm font-medium">Export Options</p>
                <p className="text-sm text-muted-foreground">
                  Your project files will be packaged as a ZIP file for download.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button onClick={handlePublish} className="w-full">
                {platform === "local" ? "Export Project" : `Publish to ${platform}`}
              </Button>
              
              {platform !== "local" && (
                <Button onClick={handleExport} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export as ZIP
                </Button>
              )}
            </div>

            {/* Integration Status */}
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> GitHub integration requires authentication. 
                Make sure you have connected your GitHub account in Settings.
              </p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PublishPanel;
