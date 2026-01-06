"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ListFilter } from "lucide-react";

export default function HeatmapPage() {
    const mapImage = PlaceHolderImages.find(p => p.id === 'admin-heatmap');

    return (
        <div className="animate-in fade-in-50">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Emotion Heatmap</CardTitle>
                        <CardDescription>Visualize user emotions by region in real-time.</CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by emotion</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value="joy">
                                <DropdownMenuRadioItem value="joy">Joy</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="calm">Calm</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="anxious">Anxious</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="inspired">Inspired</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    {mapImage && (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                             <Image
                                src={mapImage.imageUrl}
                                alt={mapImage.description}
                                fill
                                className="object-cover"
                                data-ai-hint={mapImage.imageHint}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <p className="text-2xl font-bold text-white/80 tracking-widest">HEATMAP VISUALIZATION</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
