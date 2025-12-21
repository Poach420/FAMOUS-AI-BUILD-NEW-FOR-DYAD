import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addApp, clearApps } from "@/utils/apps";
import { useState, useEffect } from "react";
import { showSuccess, showError } from "@/utils/toast";
import { Progress } from "@/components/ui/progress";
import ChatBox from "@/components/ai/ChatBox";
import CodeGenerator from "@/components/builder/CodeGenerator";
import CodeViewer from "@/components/builder/CodeViewer";
import PreviewPanel from "@/components/builder/PreviewPanel";
import ProblemsPanel, { type Problem } from "@/components/builder/ProblemsPanel";
import ConfigurePanel, { type ProjectConfig } from "@/components/builder/ConfigurePanel";
import PublishPanel, { type PublishOptions } from "@/components/builder/PublishPanel";

const BuilderPage = () => {
  const [appName, setAppName] = useState("");
  const [progress, setProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState("");
  const [generatedComponent, setGeneratedComponent] = useState<React.ReactNode>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    projectName: "my-app",
    framework: "react",
    typescript: true,
    linting: true,
    formatting: true,
    port: "3000",
  });

  useEffect(() => {
    let t: number | undefined;
    if (progress > 0 && progress < 100) {
      t = window.setTimeout(() => setProgress((p) => Math.min(100, p + 20)), 250);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [progress]);

  const handleCreateApp = () => {
    if (!appName.trim()) {
      showError("App name required. Please enter a name before creating your app.");
      return;
    }
    setProgress(10);
    const app = addApp(appName.trim());
    setProgress(100);
    showSuccess(`App "${app.name}" created!`);
    setTimeout(() => setProgress(0), 600);
    setAppName("");
  };

  const handleClearApps = () => {
    clearApps();
    showSuccess("All apps cleared.");
  };

  const handleCodeGenerated = (code: string, component: React.ReactNode) => {
    setGeneratedCode(code);
    setGeneratedComponent(component);
    
    // Simulate code analysis for problems
    if (code.length > 0) {
      // Clear problems when new code is generated successfully
      setProblems([]);
    }
  };

  const handleConfigSave = (config: ProjectConfig) => {
    setProjectConfig(config);
  };

  const handlePublish = (options: PublishOptions) => {
    // TODO: Implement actual publishing logic with GitHub API integration
    console.log("Publishing with options:", options);
  };

  const handleExport = () => {
    // TODO: Implement actual export logic to create ZIP file
    console.log("Exporting project...");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>AI Builder</CardTitle>
          <CardDescription>Create and customize your app with AI-powered tools</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Enter app name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={handleCreateApp}>
                Create App
              </Button>
              <Button type="button" variant="destructive" onClick={handleClearApps}>
                Clear Apps
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">Progress</p>
              <Progress value={progress} />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Chat Box for AI Commands */}
      <div className="max-w-4xl mx-auto">
        <ChatBox />
      </div>

      {/* Workspace Tabs */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-6">
            <PreviewPanel>
              {generatedComponent || <CodeGenerator onGenerate={handleCodeGenerated} />}
            </PreviewPanel>
          </TabsContent>
          
          <TabsContent value="code" className="mt-6">
            <CodeViewer code={generatedCode} />
          </TabsContent>
          
          <TabsContent value="problems" className="mt-6">
            <ProblemsPanel problems={problems} />
          </TabsContent>
          
          <TabsContent value="configure" className="mt-6">
            <ConfigurePanel config={projectConfig} onSave={handleConfigSave} />
          </TabsContent>
          
          <TabsContent value="publish" className="mt-6">
            <PublishPanel onPublish={handlePublish} onExport={handleExport} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuilderPage;