import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showError } from "@/utils/toast";
import { getSupabase, hasSupabase } from "@/lib/supabase";

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
    { id: "m0", role: "assistant", content: "Hi! Describe the UI you want (e.g., a Button, Card, Form, or Table)." },
  ]);
  const [input, setInput] = useState("");

  const send = async () => {
    const text = input.trim();
    if (!text) {
      showError("Please type a message.");
      return;
    }
    const user: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, user]);
    setInput("");

    if (hasSupabase) {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase.functions.invoke("ninja-chat", {
          body: { prompt: text },
        });
        if (error) {
          showError(error.message);
        } else {
          const assistantText = typeof data === "string" ? data : JSON.stringify(data);
          const assistant: ChatMessage = { id: `a-${Date.now()}`, role: "assistant", content: assistantText };
          setMessages((prev) => [...prev, assistant]);
          return;
        }
      }
    }
    setTimeout(() => {
      const assistant: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: assistantReply(text),
      };
      setMessages((prev) => [...prev, assistant]);
    }, 300);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Chat</CardTitle>
        <CardDescription>Conversational assistance to guide generation.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 rounded-md border p-3 bg-background">
          <div className="space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <span
                  className={
                    "inline-block rounded-md px-3 py-2 text-sm " +
                    (m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground")
                  }
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-3 flex gap-2">
          <Textarea
            placeholder="Describe the UI to generate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-10"
          />
          <Button type="button" onClick={send}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;