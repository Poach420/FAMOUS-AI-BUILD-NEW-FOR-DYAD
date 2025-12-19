import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getApps, type AppRecord } from "@/utils/apps";
import { showSuccess } from "@/utils/toast";

type DeploymentRecord = {
  id: string;
  appId: string;
  appName: string;
  status: "Deployed";
  startedAt: number;
};

const DeploymentsPage = () => {
  const [apps, setApps] = useState<AppRecord[]>([]);
  const [deployments, setDeployments] = useState<DeploymentRecord[]>([]);

  const loadApps = () => setApps(getApps());

  useEffect(() => {
    loadApps();
  }, []);

  const handleDeploy = (app: AppRecord) => {
    const record: DeploymentRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      appId: app.id,
      appName: app.name,
      status: "Deployed",
      startedAt: Date.now(),
    };
    setDeployments((prev) => [record, ...prev]);
    showSuccess(`App "${app.name}" is now deployed!`);
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Deployments</CardTitle>
            <CardDescription>Simulate deployments for your created apps.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadApps}>Refresh Apps</Button>
          </div>
        </CardHeader>
        <CardContent>
          {apps.length === 0 ? (
            <p className="text-gray-500">No apps found. Create an app in the Builder first.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {apps.map((app) => (
                <Button key={app.id} onClick={() => handleDeploy(app)}>
                  Deploy {app.name}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>Your latest deployment actions.</CardDescription>
        </CardHeader>
        <CardContent>
          {deployments.length === 0 ? (
            <p className="text-gray-500">No deployments yet. Select apps above to deploy!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deployments.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.appName}</TableCell>
                    <TableCell>{d.status}</TableCell>
                    <TableCell>{new Date(d.startedAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentsPage;