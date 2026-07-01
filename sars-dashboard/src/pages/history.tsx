import { useState } from "react";
import { useGetDetections, getGetDetectionsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AnimalBadge, StatusBadge } from "@/components/animal-badge";
import { Database, Filter, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function History() {
  const [animalType, setAnimalType] = useState<string>("all");
  const [date, setDate] = useState<string>("");

  const params = {
    ...(animalType !== "all" ? { animal_type: animalType } : {}),
    ...(date ? { date } : {})
  };

  const { data: detections, isLoading } = useGetDetections(params, {
    query: {
      queryKey: getGetDetectionsQueryKey(params)
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-mono font-bold tracking-widest text-primary flex items-center gap-3">
            <Database className="h-6 w-6" />
            HISTORICAL LOGS
          </h1>
          <p className="text-sm font-mono text-muted-foreground mt-1 tracking-wider uppercase">
            Complete database of recorded encounters
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 bg-card p-3 rounded-lg border border-border shadow-lg">
          <div className="flex items-center gap-2 pr-2 border-r border-border hidden sm:flex text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span className="text-xs font-mono tracking-widest uppercase">Filters</span>
          </div>
          
          <Select value={animalType} onValueChange={setAnimalType}>
            <SelectTrigger className="w-[150px] font-mono text-xs uppercase tracking-widest bg-background border-border h-9">
              <SelectValue placeholder="CLASS" />
            </SelectTrigger>
            <SelectContent className="font-mono text-xs uppercase">
              <SelectItem value="all">ALL CLASSES</SelectItem>
              <SelectItem value="Lebah">LEBAH (BEE)</SelectItem>
              <SelectItem value="Anjing">ANJING (DOG)</SelectItem>
              <SelectItem value="Monyet">MONYET (MONKEY)</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-[160px] font-mono text-xs uppercase tracking-widest bg-background border-border h-9 [color-scheme:dark]"
          />
        </div>
      </div>

      <Card className="border-border shadow-lg bg-card/80 backdrop-blur">
        <CardContent className="p-0">
          <div className="rounded-md">
            <Table>
              <TableHeader className="bg-background/80">
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-11">Log ID</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-11">Timestamp</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-11">Sector / Location</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-11">Subject Class</TableHead>
                  <TableHead className="font-mono text-xs uppercase tracking-widest text-muted-foreground h-11 text-right">Action Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Loader2 className="h-6 w-6 animate-spin mb-2 text-primary" />
                        <span className="font-mono text-xs tracking-widest uppercase">Querying Database...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : !detections || detections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-mono uppercase text-sm tracking-widest">
                      No records match the current parameters
                    </TableCell>
                  </TableRow>
                ) : (
                  detections.map((detection) => (
                    <TableRow key={detection.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{detection.id.toString().padStart(5, '0')}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {format(new Date(detection.detected_at), "dd MMM yyyy · HH:mm:ss")}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
