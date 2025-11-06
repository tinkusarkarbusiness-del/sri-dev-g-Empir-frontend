
"use client"

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { modules, testimonials, pricingTiers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HeroSection from '@/components/hero-section';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1 animated-gradient">
        <HeroSection />

        {/* Features Section */}
        <motion.section 
          id="features" 
          className="w-full py-16 md:py-24 lg:py-32"
          initial={{opacity:0,y:20}} 
          animate={{opacity:1,y:0}} 
          transition={{duration:0.5, delay: 0.2}}
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl md:text-5xl text-primary">
              The 6 Pillars of Power
            </h2>
            <p className="mt-4 mb-12 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
              Discover the integrated modules designed to elevate your life and enterprise.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => {
                const moduleImage = PlaceHolderImages.find(p => p.id === module.imageId);
                return (
                  <Card key={module.id} className="group flex flex-col overflow-hidden transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/30 hover:bg-card/90 transform hover:-translate-y-2">
                    <CardHeader className="flex-row items-center gap-4 p-4">
                       {moduleImage && <Image src={moduleImage.imageUrl} alt={module.title} width={80} height={80} className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={moduleImage.imageHint}/>}
                      <div className="flex-1">
                        <CardTitle className="font-headline text-xl text-primary">{module.title}</CardTitle>
                        <CardDescription>{module.shortDescription}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{module.fullDescription}</p>
                    </CardContent>
                    <CardFooter className="p-4">
                       <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-yellow-300" asChild>
                         <Link href={`/login`}>Explore <ArrowRight className="ml-2 h-4 w-4" /></Link>
                       </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section 
          id="pricing" 
          className="w-full py-16 md:py-24 lg:py-32 bg-background/50 backdrop-blur-md"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.5, delay: 0.6}}
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl md:text-5xl text-primary">
              Choose Your Path
            </h2>
            <p className="mt-4 mb-12 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
              Unlock your potential with a plan that fits your ambition.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className={`flex flex-col shadow-lg bg-card/80 ${tier.isFeatured ? 'border-primary border-2 scale-105 shadow-primary/30' : 'border-border/20'}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-4xl font-bold text-primary">{tier.price}</CardDescription>
                    <p className="text-sm text-muted-foreground">{tier.period}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-4">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className={`w-full ${tier.isFeatured ? 'bg-primary hover:bg-primary/90' : 'bg-accent hover:bg-accent/90'}`}>
                      <Link href="/login">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          id="testimonials" 
          className="w-full py-16 md:py-24 lg:py-32"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.5, delay: 0.8}}
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-headline font-bold tracking-tighter text-center sm:text-4xl md:text-5xl text-primary">
              From Our Devotees
            </h2>
            <p className="mt-4 mb-12 max-w-2xl mx-auto text-center text-muted-foreground md:text-lg">
              Real stories from members of the SriDev Empire.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => {
                  const avatarImage = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                  return (
                    <Card key={testimonial.name} className="bg-card/80 backdrop-blur-sm border border-border/20">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Avatar>
                            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name} data-ai-hint={avatarImage.imageHint} />}
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                        <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                            ))}
                        </div>
                        <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  );
}
