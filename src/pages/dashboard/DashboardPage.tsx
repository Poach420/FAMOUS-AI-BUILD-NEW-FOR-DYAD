import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Overview of your app activity and metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This is the Dashboard page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;