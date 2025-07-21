import React from 'react';

import { ReusableCard, CardData } from './ReusableCard';

interface SectionCardsProps {
  cards: CardData[];
}

export const SectionCards: React.FC<SectionCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card, index) => (
        <ReusableCard key={index} data={card} />
      ))}
    </div>
  );
};