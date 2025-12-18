import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

type Plan = {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$10/month",
    features: ["Basic Builder Access", "5 App Deployments"],
  },
  {
    name: "Pro",
    price: "$25/month",
    features: ["Advanced Builder Access", "20 App Deployments"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    features: ["Unlimited Access", "Dedicated Support"],
  },
];

const PricingPage = () => {
  const handleChoose = (plan: Plan) => {
    toast({
      title: `Chosen: ${plan.name}`,
      description: `You selected the ${plan.name} plan (${plan.price}).`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-gray-600 mt-2">
          Pick a plan that fits your team’s needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.popular ? "border-primary" : ""}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {plan.popular && <Badge>Popular</Badge>}
              </div>
              <CardDescription className="text-lg">{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-gray-700">
                    • {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-4 w-full" onClick={() => handleChoose(plan)}>
                Choose {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;