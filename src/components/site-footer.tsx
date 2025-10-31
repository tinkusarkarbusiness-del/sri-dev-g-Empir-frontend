
import { SriDevLogo } from "./icons";

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔱</span>
                <span className="font-headline text-lg font-bold text-primary">SriDev Empire™</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Divine Intelligence Network
            </p>
            <p className="text-xs text-muted-foreground">
                © 2025 SriDevG™ Empire. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
