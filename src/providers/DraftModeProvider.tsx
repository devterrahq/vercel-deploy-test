'use client';

import { createContext, useContext } from 'react';

interface DraftModeProviderProps {
  isDraftMode: boolean;
  children: React.ReactNode;
}

export const DraftModeContext = createContext<boolean>(false);
export const useDraftMode = () => {
  const context = useContext(DraftModeContext);
  if (context === undefined) {
    throw new Error('useDraftMode must be used within a DraftModeProvider');
  }
  return context;
};
export default function DraftModeProvider({ children, isDraftMode }: DraftModeProviderProps) {
  return <DraftModeContext.Provider value={isDraftMode}>{children}</DraftModeContext.Provider>;
}
