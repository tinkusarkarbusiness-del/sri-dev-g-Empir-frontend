"use client"

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { generateSuggestedActions } from '@/ai/flows/generate-suggested-actions';
import { Loader2, Wand2 } from "lucide-react";
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type ActionModalProps = {
  scenario: string;
};

export function ActionModal({ scenario }: ActionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const result = await generateSuggestedActions({
        userProfile: "A user interested in spiritual growth and mindfulness.",
        currentContext: "Evening, relaxed at home.",
        scenario: scenario,
      });
      setSuggestions(result.suggestions);
    } catch (e) {
      setError("Failed to generate suggestions. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Wand2 className="mr-2 h-4 w-4" /> Get AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">AI Assistant</DialogTitle>
          <DialogDescription>
            Let our divine AI suggest actions based on your current state.
            <br/>
            <strong>Scenario:</strong> {scenario}
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4 text-muted-foreground">Generating divine guidance...</p>
            </div>
          )}
          {error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {suggestions.length > 0 && (
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold">Here are your suggested actions:</h3>
                <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                    <Badge key={index} variant="secondary" className="text-lg capitalize p-2 bg-accent/20 text-accent-foreground border-accent">
                    {suggestion}
                    </Badge>
                ))}
                </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleGenerate} disabled={isLoading} className="bg-primary hover:bg-primary/90">
             {isLoading ? 'Generating...' : 'Generate New Suggestions'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
