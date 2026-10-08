'use client';

import { createContext, useContext } from 'react';
import type { MegaParam } from '@/types';

interface MegaParamProviderProps {
  megaParam: MegaParam;
  children: React.ReactNode;
}

export const MegaParamContext = createContext<MegaParam>({
  authenticated: false,
  isDraftMode: false,
  searchParams: {},
  roles: [],
});
export const useMegaParam = () => {
  const context = useContext(MegaParamContext);
  if (context === undefined) {
    throw new Error('useMegaParam must be used within a MegaParamProvider');
  }
  return context;
};
export default function MegaParamProvider({ children, megaParam }: MegaParamProviderProps) {
  return <MegaParamContext.Provider value={megaParam}>{children}</MegaParamContext.Provider>;
}
