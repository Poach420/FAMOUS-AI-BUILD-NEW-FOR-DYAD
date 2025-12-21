import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { showError } from "@/utils/toast";
import { getSupabase, hasSupabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

function assistantReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("button")) return "Generated a primary Button. Try the code generator to preview it.";
  if (p.includes("form")) return "Generated a simple form schema with Input and Submit. Use the code generator to render.";
  if (p.includes("table") || p.includes("list")) return "Generated a list/table config. Open the generator to preview.";
  if (p.includes("card")) return "Generated a Card layout suggestion. Preview in the generator.";
  return "I can help generate UI: mention Button, Card, Form, or Table in your prompt.";
}

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m0", role: "assistant", content: "Hi! I'm your AI builder assistant. Describe the UI you want to build, and I'll help generate it. Try commands like:\n• 'Create a button'\n• 'Generate a login form'\n• 'Build a card component'\n• 'Make a data table'" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  const send = async () => {
    const text = input.trim();
    if (!text) {
      showError("Please type a message.");
      return;
    }
    
    const user: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, user]);
    setInput("");
    setIsLoading(true);
    setBuildProgress(10);

    // Simulate build progress
    const progressInterval = setInterval(() => {
      setBuildProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 200);

    if (hasSupabase) {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.functions.invoke("ninja-chat", {
          body: { prompt: text },
        });
        
        clearInterval(progressInterval);
        setIsLoading(false);
        setBuildProgress(100);
        
        if (error) {
          showError(error.message);
          setTimeout(() => setBuildProgress(0), 1000);
        } else {
          const assistantText = typeof data === "string" ? data : JSON.stringify(data);
          const assistant: ChatMessage = { id: `a-${Date.now()}`, role: "assistant", content: assistantText };
          setMessages((prev) => [...prev, assistant]);
          setTimeout(() => setBuildProgress(0), 1000);
          return;
        }
      }
    }

    // Fallback to local response
    setTimeout(() => {
      clearInterval(progressInterval);
      setBuildProgress(100);
      
      const assistant: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: assistantReply(text),
      };
      setMessages((prev) => [...prev, assistant]);
      setIsLoading(false);
      
      setTimeout(() => setBuildProgress(0), 1000);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Chat</CardTitle>
        <CardDescription>
          English-based commands for instant app building
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 rounded-md border p-3 bg-background mb-3">
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <span
                  className={
                    "inline-block rounded-md px-3 py-2 text-sm whitespace-pre-wrap max-w-[85%] " +
                    (m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground")
                  }
                >
                  {m.content}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <span className="inline-block rounded-md px-3 py-2 text-sm bg-muted text-foreground">
                  <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                  Building your component...
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {buildProgress > 0 && (
          <div className="mb-3 space-y-1">
            <p className="text-xs text-muted-foreground">Build Progress</p>
            <Progress value={buildProgress} />
          </div>
        )}
        
        <div className="flex gap-2">
          <Textarea
            placeholder="Describe what you want to build... (Press Enter to send, Shift+Enter for new line)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-10 max-h-32"
            disabled={isLoading}
          />
          <Button type="button" onClick={send} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;