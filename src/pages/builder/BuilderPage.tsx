import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addApp } from "@/utils/apps";
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

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Builder</CardTitle>
          <CardDescription>Create and customize your app features.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter app name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
            <Button onClick={handleCreateApp}>Create App</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuilderPage;