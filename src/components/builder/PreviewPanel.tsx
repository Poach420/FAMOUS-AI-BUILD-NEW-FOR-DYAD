import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCw, Maximize2 } from "lucide-react";
import { showSuccess } from "@/utils/toast";

interface PreviewPanelProps {
  children?: React.ReactNode;
  onRefresh?: () => void;
  onFullscreen?: () => void;
}

const PreviewPanel = ({ children, onRefresh, onFullscreen }: PreviewPanelProps) => {
  const handleRefresh = () => {
    onRefresh?.();
    showSuccess("Preview refreshed");
  };

  const handleFullscreen = () => {
    onFullscreen?.();
    showSuccess("Opening fullscreen preview");
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Real-time app visualization</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={handleRefresh}
              title="Refresh preview"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={handleFullscreen}
              title="Fullscreen preview"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border bg-background">
          <div className="p-4">
            {children || (
              <div className="flex items-center justify-center h-[360px] text-muted-foreground">
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium">No preview available</p>
                  <p className="text-sm">Generate a component to see it rendered here</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;
