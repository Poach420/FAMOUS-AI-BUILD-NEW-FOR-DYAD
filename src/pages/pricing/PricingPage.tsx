import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const PricingPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>Plans and costs for using the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This is the Pricing page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPage;