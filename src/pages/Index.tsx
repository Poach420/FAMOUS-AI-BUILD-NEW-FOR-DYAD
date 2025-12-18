import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Digital Ninja App Builder</h1>
        <p className="text-xl text-gray-600">
          A fresh start to create, deploy, and scale custom applications without lock-ins or dependencies.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Button asChild><Link to="/dashboard">Go to Dashboard</Link></Button>
          <Button asChild variant="secondary"><Link to="/builder">Open Builder</Link></Button>
          <Button asChild variant="secondary"><Link to="/deployments">View Deployments</Link></Button>
          <Button asChild variant="outline"><Link to="/pricing">See Pricing</Link></Button>
          <Button asChild variant="outline"><Link to="/settings">Settings</Link></Button>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;