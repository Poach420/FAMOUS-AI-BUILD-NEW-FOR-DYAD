import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addApp, clearApps } from "@/utils/apps";
import { useState, useEffect } from "react";
import { showSuccess, showError } from "@/utils/toast";
import { Progress } from "@/components/ui/progress";
import ChatBox from "@/components/ai/ChatBox";
import CodeGenerator from "@/components/builder/CodeGenerator";

const BuilderPage = () => {
  const [appName, setAppName] = useState("");
  const [progress, setProgress] = useState(0);

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Builder</CardTitle>
          <CardDescription>Create and customize your app features.</CardDescription>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatBox />
        <CodeGenerator />
      </div>
    </div>
  );
};

export default BuilderPage;