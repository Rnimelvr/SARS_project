import { Badge } from "@/components/ui/badge";

export function AnimalBadge({ type }: { type: string }) {
  const normalized = type.toLowerCase();
  
  if (normalized === 'lebah') {
    return (
      <Badge className="bg-[#d90429] hover:bg-[#d90429]/80 text-white font-mono tracking-wider border border-[#d90429]/50 shadow-[0_0_10px_rgba(217,4,41,0.3)] px-2 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse"></span>
        LEBAH
      </Badge>
    );
  }
  
  if (normalized === 'anjing') {
    return (
      <Badge className="bg-[#2a9d8f] hover:bg-[#2a9d8f]/80 text-white font-mono tracking-wider border border-[#2a9d8f]/50 shadow-[0_0_10px_rgba(42,157,143,0.3)] px-2 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></span>
        ANJING
      </Badge>
    );
  }
  
  if (normalized === 'monyet') {
    return (
      <Badge className="bg-[#ffbc00] hover:bg-[#ffbc00]/80 text-black font-mono tracking-wider border border-[#ffbc00]/50 shadow-[0_0_10px_rgba(255,188,0,0.3)] px-2 py-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-black mr-1.5"></span>
        MONYET
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="font-mono tracking-wider bg-card text-muted-foreground border-border px-2 py-0.5">
      {type}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  
  if (normalized === 'detected') {
    return (
      <span className="inline-flex items-center text-xs font-mono font-medium text-destructive tracking-wider">
        <span className="mr-1.5 flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
        </span>
        DETECTED
      </span>
    );
  }
  
  if (normalized === 'repelled') {
    return (
      <span className="inline-flex items-center text-xs font-mono font-medium text-[#2a9d8f] tracking-wider">
        <span className="mr-1.5 flex h-2 w-2 relative">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2a9d8f]"></span>
        </span>
        REPELLED
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-xs font-mono font-medium text-muted-foreground tracking-wider uppercase">
      {status}
    </span>
  );
}
