import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Shield, Radio, Server, Zap, Radar } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="mb-8 border-b border-border/50 pb-6">
        <h1 className="text-3xl font-mono font-bold tracking-[0.2em] text-primary flex items-center gap-3">
          <Info className="h-8 w-8" />
          SYSTEM INFORMATION
        </h1>
        <p className="text-sm font-mono text-muted-foreground mt-2 tracking-widest uppercase">
          Technical specifications & operations directive
        </p>
      </div>

      <Card className="border-border bg-card shadow-lg overflow-hidden">
        <div className="h-2 w-full bg-primary/20 relative">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-primary"></div>
        </div>
        <CardHeader className="bg-muted/10 pb-4">
          <CardTitle className="font-mono text-xl tracking-widest text-foreground">PROJECT IDENTIFIER</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4 font-mono">
          <div className="grid grid-cols-[150px_1fr] items-baseline border-b border-border/50 pb-4">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Codename</span>
            <span className="text-lg font-bold text-primary tracking-wider">SARS (Smart Animal Repellent System)</span>
          </div>
          
          <div className="grid grid-cols-[150px_1fr] items-baseline border-b border-border/50 pb-4">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Developer Org</span>
            <span className="text-base text-foreground tracking-wider">KV5 VATTORS</span>
          </div>

          <div className="grid grid-cols-[150px_1fr] pt-2">
            <span className="text-xs text-muted-foreground uppercase tracking-widest pt-1">Core Objective</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Automated surveillance and deterrence of unauthorized wildlife intrusions (Lebah, Anjing, Monyet) within secured campus perimeters. Ensures safety of personnel and minimizes facility damage through real-time detection and response.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card shadow-lg">
        <CardHeader className="bg-muted/10 pb-4 border-b border-border/50">
          <CardTitle className="font-mono text-xl tracking-widest text-foreground">SYSTEM CAPABILITIES</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="space-y-4 font-mono">
            <li className="flex gap-4 p-3 rounded-lg border border-border/50 bg-background/50">
              <div className="mt-0.5">
                <Radar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-foreground uppercase mb-1">Live Telemetry</h3>
                <p className="text-xs text-muted-foreground">Continuous monitoring with automated synchronization to central command interface.</p>
              </div>
            </li>
            
            <li className="flex gap-4 p-3 rounded-lg border border-border/50 bg-background/50">
              <div className="mt-0.5">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-foreground uppercase mb-1">Automated Deterrence</h3>
                <p className="text-xs text-muted-foreground">Integration with IoT effectors to repel identified targets without manual intervention.</p>
              </div>
            </li>
            
            <li className="flex gap-4 p-3 rounded-lg border border-border/50 bg-background/50">
              <div className="mt-0.5">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-foreground uppercase mb-1">Historical Logging</h3>
                <p className="text-xs text-muted-foreground">Immutable database recording all encounters for post-incident review and analysis.</p>
              </div>
            </li>

            <li className="flex gap-4 p-3 rounded-lg border border-border/50 bg-background/50">
              <div className="mt-0.5">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-foreground uppercase mb-1">Threat Analytics</h3>
                <p className="text-xs text-muted-foreground">Pattern recognition algorithms calculating campus threat levels based on detection frequency.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="text-center font-mono text-xs text-muted-foreground uppercase tracking-widest pt-8 pb-4">
        End of Document
      </div>
    </div>
  );
}
