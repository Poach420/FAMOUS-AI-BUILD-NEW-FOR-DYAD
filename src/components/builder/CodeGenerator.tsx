import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { showSuccess, showError } from "@/utils/toast";

type GenType = "button" | "card" | "form" | "list";

type GenConfig =
  | { type: "button"; label: string }
  | { type: "card"; title: string; description?: string }
  | { type: "form"; placeholder: string; submitLabel: string }
  | { type: "list"; items: string[] };

function generateConfig(prompt: string): GenConfig {
  const p = prompt.toLowerCase();
  if (p.includes("button")) return { type: "button", label: "Click Me" };
  if (p.includes("card")) return { type: "card", title: "Generated Card", description: "This card was generated from your prompt." };
  if (p.includes("form")) return { type: "form", placeholder: "Enter something...", submitLabel: "Submit" };
  return { type: "list", items: ["Alpha", "Bravo", "Charlie"] };
}

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [config, setConfig] = useState<GenConfig | null>(null);

  const handleGenerate = () => {
    const text = prompt.trim();
    if (!text) {
      showError("Please enter a prompt to generate UI.");
      return;
    }
    const cfg = generateConfig(text);
    setConfig(cfg);
    showSuccess("Generated component preview ready.");
  };

  const renderPreview = () => {
    if (!config) return <p className="text-muted-foreground">No preview yet. Generate from a prompt.</p>;
    switch (config.type) {
      case "button":
        return <Button onClick={() => showSuccess("Button clicked!")}>{config.label}</Button>;
      case "card":
        return (
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>{config.title}</CardTitle>
              {config.description && <CardDescription>{config.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This is a generated Card preview.</p>
            </CardContent>
          </Card>
        );
      case "form":
        return (
          <div className="flex items-center gap-2">
            <Input placeholder={config.placeholder} />
            <Button onClick={() => showSuccess("Submitted!")}>{config.submitLabel}</Button>
          </div>
        );
      case "list":
        return (
          <Table className="max-w-md">
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {config.items.map((item) => (
                <TableRow key={item}>
                  <TableCell className="font-medium">{item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Generator</CardTitle>
        <CardDescription>Create dynamic previews from your prompt.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="E.g., Generate a Button/Card/Form/List"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 min-w-[240px]"
          />
          <Button type="button" onClick={handleGenerate}>
            Generate
          </Button>
        </div>

        <div className="mt-4">{renderPreview()}</div>
      </CardContent>
    </Card>
  );
};

export default CodeGenerator;