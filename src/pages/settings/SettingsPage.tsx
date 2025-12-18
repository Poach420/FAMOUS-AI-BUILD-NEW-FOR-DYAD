import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Configure preferences for your app.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This is the Settings page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;