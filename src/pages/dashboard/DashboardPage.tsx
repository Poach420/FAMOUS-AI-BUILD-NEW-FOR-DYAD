import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getApps, clearApps, removeApp, type AppRecord } from "@/utils/apps";
import { toast } from "@/components/ui/use-toast";

const DashboardPage = () => {
  const [apps, setApps] = useState<AppRecord[]>([]);

  const refresh = () => {
    setApps(getApps());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleClear = () => {
    clearApps();
    refresh();
    toast({ title: "Cleared", description: "All apps were removed." });
  };

  const handleRemove = (id: string) => {
    removeApp(id);
    refresh();
    toast({ title: "Removed", description: "App deleted." });
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Apps you’ve created.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link to="/builder">Open Builder</Link>
            </Button>
            <Button variant="outline" onClick={refresh}>Refresh</Button>
            <Button variant="destructive" onClick={handleClear}>Clear</Button>
          </div>
        </CardHeader>
        <CardContent>
          {apps.length === 0 ? (
            <p className="text-gray-500">
              No apps created yet. Go to the Builder page to create one.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{new Date(app.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => handleRemove(app.id)}>
                        Delete
                      </Button>
                    </TableCell>
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

export default DashboardPage;