import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const BuilderPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Builder</CardTitle>
          <CardDescription>Create and customize your app features.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This is the Builder page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuilderPage;