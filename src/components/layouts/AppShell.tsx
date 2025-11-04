import type { ReactElement, ReactNode } from 'react';
import Header from '@/components/layouts/Header';
import MeloBot from '@/components/widgets/MeloBot';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps): ReactElement {
  return (
    <div data-component="app-shell" className="relative min-h-screen bg-gray-50 text-gray-900">
      <div className="pointer-events-none absolute inset-x-0 top-[-6rem] h-[18rem] bg-gradient-to-b from-purple-200/60 via-purple-100/40 to-transparent blur-3xl" />
      <Header />
      <main data-element="content-wrapper" className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>
      <MeloBot />
    </div>
  );
}
