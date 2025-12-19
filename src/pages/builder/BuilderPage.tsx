import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addApp, clearApps } from "@/utils/apps";
import { useState } from "react";
import { showSuccess, showError } from "@/utils/toast";

const BuilderPage = () => {
  const [appName, setAppName] = useState("");

  const handleCreateApp = () => {
    if (!appName.trim()) {
      showError("App name required. Please enter a name before creating your app.");
      return;
    }

    const app = addApp(appName.trim());
    showSuccess(`App "${app.name}" created!`);
    setAppName("");
  };

  const handleClearApps = () => {
    clearApps();
    showSuccess("All apps cleared.");
  };

  return (
    <div className="container mx-auto p-6">
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuilderPage;