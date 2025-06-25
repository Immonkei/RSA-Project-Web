
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EncryptionCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  ctaText: string;
  ctaLink: string;
}

const EncryptionCard = ({ title, description, icon, ctaText, ctaLink }: EncryptionCardProps) => {
  return (
    <Card className="bg-muted/20 border-muted/30 backdrop-blur-sm hover:border-crypto-purple/50 transition-all duration-300 group h-full flex flex-col">
      <CardHeader>
        <div className="mb-4 bg-gradient-to-br from-crypto-purple to-crypto-light-purple p-3 rounded-xl w-14 h-14 flex items-center justify-center group-hover:animate-float transition-all duration-300">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="h-full"></div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" className="w-full bg-gradient-to-r from-crypto-purple to-crypto-light-purple hover:opacity-90 transition-opacity">
          <a href={ctaLink}>{ctaText}</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EncryptionCard;
