import { useGetDashboardStatus, getGetDashboardStatusQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnimalBadge, StatusBadge } from "@/components/animal-badge";
import { Activity, AlertTriangle, ShieldCheck, Crosshair, Radar } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { data, isLoading, isError } = useGetDashboardStatus({
    query: {
      refetchInterval: 30000,
      queryKey: getGetDashboardStatusQueryKey()
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-32 bg-card animate-pulse rounded-lg border border-border"></div>
          <div className="h-32 bg-card animate-pulse rounded-lg border border-border"></div>
        </div>
        <div className="h-96 bg-card animate-pulse rounded-lg border border-border"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 border border-destructive/50 bg-destructive/10 rounded-lg text-center font-mono">
        <AlertTriangle className="h-10 w-10 text-destructive mx-auto mb-4" />
        <h2 className="text-xl text-destructive font-bold tracking-widest mb-2">SYSTEM ERROR</h2>
        <p className="text-muted-foreground text-sm uppercase">Failed to retrieve dashboard status feed. Check connection.</p>
      </div>
    );
  }

  const isSystemActive = data.system_status.toUpperCase() === 'AKTIF';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Stats Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card/60 backdrop-blur relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl -mr-10 -mt-10 transition-colors duration-1000 ${isSystemActive ? 'bg-[#2a9d8f]/20' : 'bg-destructive/20'}`}></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-mono tracking-widest text-muted-foreground uppercase">System Core Status</CardTitle>
            {isSystemActive ? <ShieldCheck className="h-5 w-5 text-[#2a9d8f]" /> : <AlertTriangle className="h-5 w-5 text-destructive" />}
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3">
              <div className={`text-4xl font-mono font-bold tracking-wider ${isSystemActive ? 'text-[#2a9d8f]' : 'text-destructive'}`}>
                {data.system_status.toUpperCase()}
              </div>
              {isSystemActive && (
                <div className="flex h-3 w-3 mb-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2a9d8f] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2a9d8f]"></span>
                </div>
              )}
            </div>
            <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wider">
              Monitoring all campus perimeters
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/60 backdrop-blur relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl -mr-10 -mt-10"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-mono tracking-widest text-muted-foreground uppercase">Intrusions Today</CardTitle>
            <Radar className="h-5 w-5 text-primary animate-[spin_4s_linear_infinite]" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-mono font-bold text-foreground tracking-wider">
              {data.cases_today.toString().padStart(3, '0')}
            </div>
            <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wider">
              Confirmed encounters in past 24h
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Area */}
      <Card className="border-border shadow-lg bg-card/80 backdrop-blur">
        <CardHeader className="border-b border-border/50 bg-muted/10 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-mono text-lg tracking-widest text-primary flex items-center gap-2">
                <Crosshair className="h-5 w-5" />
                ACTIVE TACTICAL FEED
              </CardTitle>
              <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">Recent encounters (Live Auto-Sync)</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-background rounded-full border border-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[0.65rem] font-mono font-bold tracking-widest text-primary uppercase">Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-background/50">
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-10">Log ID</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-10">Timestamp</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-10">Sector / Location</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-10">Subject Class</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-10 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recent_detections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-mono uppercase text-sm tracking-widest">
                    No recent intrusions logged
                  </TableCell>
                </TableRow>
              ) : (
                data.recent_detections.map((detection) => (
                  <TableRow key={detection.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{detection.id.toString().padStart(5, '0')}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {format(new Date(detection.detected_at), "HH:mm:ss · dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-medium tracking-wide">
                      {detection.location}
                    </TableCell>
                    <TableCell>
                      <AnimalBadge type={detection.animal_type} />
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={detection.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
