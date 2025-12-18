import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const BuilderPage = () => {
  const [appName, setAppName] = useState("");

  const handleCreateApp = () => {
    if (!appName.trim()) {
      toast({
        title: "App name required",
        description: "Please enter a name before creating your app.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "App created",
      description: `App "${appName}" created!`,
    });

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