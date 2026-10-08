'use client';

import { createContext, useContext } from 'react';
import type { NormalizedSearchParams } from '@/types';

interface SearchParamsProviderProps {
  searchParams: NormalizedSearchParams;
  children: React.ReactNode;
}

export const SearchParamsContext = createContext<NormalizedSearchParams>({});
export const useSearchParams = () => {
  const context = useContext(SearchParamsContext);
  if (context === undefined) {
    throw new Error('useSearchParams must be used within a SearchParamsProvider');
  }
  return context;
};
export default function SearchParamsProvider({ children, searchParams }: SearchParamsProviderProps) {
  return <SearchParamsContext.Provider value={searchParams}>{children}</SearchParamsContext.Provider>;
}
