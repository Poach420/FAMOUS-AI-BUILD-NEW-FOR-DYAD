import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const DeploymentsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Deployments</CardTitle>
          <CardDescription>Manage and review your app deployments.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This is the Deployments page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentsPage;