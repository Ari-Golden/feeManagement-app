import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

interface CardData {
  description: string;
  title: string;
  value: string | number;
  trend: 'up' | 'down';
  trendText: string;
  footerMainText: string;
  footerSubText: string;
}

interface ReusableCardProps {
  data: CardData;
}

export const ReusableCard: React.FC<ReusableCardProps> = ({ data }) => {
  const TrendIcon = data.trend === 'up' ? IconTrendingUp : IconTrendingDown;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{data.description}</CardDescription>
        <CardTitle className="flex items-center justify-between text-lg font-semibold">
          {data.value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendIcon />
            {data.trendText}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {data.footerMainText} <TrendIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">{data.footerSubText}</div>
      </CardFooter>
    </Card>
  );
};