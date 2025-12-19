import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Bolt, Database, Upload, GitBranch, Users, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(240_30%_8%)] via-[hsl(240_28%_10%)] to-background text-foreground">
      <section className="container mx-auto px-4 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
          Powered by your choice of AI provider
        </div>
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            The Digital Ninja App
          </span>{" "}
          Builder
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Your stealthy companion to craft apps—powerful automation, precision-engineered code, and unparalleled intelligence.
          From static sites to full SaaS platforms in minutes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/builder">Start Building Free</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">View Pricing</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "Static marketing sites",
            "SaaS platforms with auth",
            "E‑commerce storefronts",
            "Admin dashboards",
            "API backends",
            "Payment portals",
            "Timer apps with state",
            "CRUD applications",
            "Real‑time chat apps",
            "Portfolio websites",
            "Blog platforms",
            "Booking systems",
          ].map((label) => (
            <div key={label} className="rounded-xl border bg-card/30 p-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Production-Ready Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: <Bolt className="h-5 w-5" />, title: "AI‑Powered Generation", desc: "Generate production-ready apps from natural language prompts." },
            { icon: <Database className="h-5 w-5" />, title: "Full‑Stack Output", desc: "Frontends with React + Tailwind, and portable backend options." },
            { icon: <Upload className="h-5 w-5" />, title: "One‑Click Deployment", desc: "Deploy to Vercel/Render with SPA routing out‑of‑the‑box." },
            { icon: <GitBranch className="h-5 w-5" />, title: "Version Control", desc: "Export your code; keep full ownership and control." },
            { icon: <Users className="h-5 w-5" />, title: "Team Collaboration", desc: "Invite your team and ship together faster." },
            { icon: <CreditCard className="h-5 w-5" />, title: "Payments‑Ready", desc: "Designed to integrate with your preferred payment stack." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card/30 p-5">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                {f.icon}
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pb-10">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;