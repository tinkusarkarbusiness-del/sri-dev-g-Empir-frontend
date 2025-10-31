import Link from "next/link";
import { Button } from "./ui/button";
import { SriDevLogo } from "./icons";

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <SriDevLogo className="h-8 w-8" />
          <span className="font-headline text-xl font-bold text-primary drop-shadow-md">SriDev Empire</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Testimonials
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hidden sm:inline-flex" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
