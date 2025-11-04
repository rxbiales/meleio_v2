'use client';

import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import MeloChat from '@/components/widgets/MeloChat';
import { Button } from '@/components/ui/button';

const ACTIVE_ICON = '/meloIcon2.png';
const IDLE_ICON = '/meloIcon.png';

export default function MeloBot(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {isOpen && <MeloChat onClose={() => setIsOpen(false)} />}

      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-component="melobot-trigger"
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 overflow-hidden border border-purple-100 bg-white shadow-lg transition-all duration-200 hover:shadow-xl"
        aria-label="Abrir chat Melo"
      >
        <Image
          src={isHovered ? ACTIVE_ICON : IDLE_ICON}
          alt="Melo Bot"
          width={56}
          height={56}
          className="h-full w-full rounded-full object-cover"
        />
      </Button>
    </>
  );
}
