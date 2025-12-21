import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { showSuccess, showError } from "@/utils/toast";
import { getSupabase, hasSupabase } from "@/lib/supabase";

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

function generateCodeFromConfig(config: GenConfig): string {
  switch (config.type) {
    case "button":
      return `import { Button } from "@/components/ui/button";

const MyButton = () => {
  return (
    <Button onClick={() => alert("Button clicked!")}>
      ${config.label}
    </Button>
  );
};

export default MyButton;`;
    
    case "card":
      return `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const MyCard = () => {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>${config.title}</CardTitle>
        ${config.description ? `<CardDescription>${config.description}</CardDescription>` : ''}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is a generated Card component.
        </p>
      </CardContent>
    </Card>
  );
};

export default MyCard;`;
    
    case "form":
      return `import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MyForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input placeholder="${config.placeholder}" />
      <Button type="submit">${config.submitLabel}</Button>
    </form>
  );
};

export default MyForm;`;
    
    case "list":
      return `import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const MyTable = () => {
  const items = ${JSON.stringify(config.items, null, 2)};

  return (
    <Table className="max-w-md">
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item}>
            <TableCell className="font-medium">{item}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MyTable;`;
  }
}

interface CodeGeneratorProps {
  onGenerate?: (code: string, component: React.ReactNode) => void;
}

const CodeGenerator = ({ onGenerate }: CodeGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [config, setConfig] = useState<GenConfig | null>(null);

  const handleGenerate = async () => {
    const text = prompt.trim();
    if (!text) {
      showError("Please enter a prompt to generate UI.");
      return;
    }

    if (hasSupabase) {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.functions.invoke("ninja-generate", {
          body: { prompt: text },
        });
        if (error) {
          showError(error.message);
        } else {
          try {
            const cfg = typeof data === "string" ? JSON.parse(data) : data;
            setConfig(cfg as GenConfig);
            const generatedCode = generateCodeFromConfig(cfg as GenConfig);
            onGenerate?.(generatedCode, renderPreview(cfg as GenConfig));
            showSuccess("Generated component from Supabase function.");
            return;
          } catch {
            showError("Invalid generator output format.");
          }
        }
      }
    }

    const cfg = generateConfig(text);
    setConfig(cfg);
    const generatedCode = generateCodeFromConfig(cfg);
    onGenerate?.(generatedCode, renderPreview(cfg));
    showSuccess("Generated component preview ready.");
  };

  const renderPreview = (cfg: GenConfig | null = config) => {
    if (!cfg) return <p className="text-muted-foreground">No preview yet. Generate from a prompt.</p>;
    switch (cfg.type) {
      case "button":
        return <Button onClick={() => showSuccess("Button clicked!")}>{cfg.label}</Button>;
      case "card":
        return (
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>{cfg.title}</CardTitle>
              {cfg.description && <CardDescription>{cfg.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This is a generated Card preview.</p>
            </CardContent>
          </Card>
        );
      case "form":
        return (
          <div className="flex items-center gap-2">
            <Input placeholder={cfg.placeholder} />
            <Button onClick={() => showSuccess("Submitted!")}>{cfg.submitLabel}</Button>
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
              {cfg.items.map((item) => (
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