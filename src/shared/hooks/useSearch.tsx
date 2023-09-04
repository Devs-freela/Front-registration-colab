import React, {createContext, ReactNode, useContext, useState} from 'react';

export interface SearchProps {
  column: string;
  value: string;
}

interface SearchContextData {
  obj: SearchProps | undefined;
  setObj: (valor: SearchProps) => void;
}

interface SearchProviderProps {
  children: ReactNode;
}
const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({children}: SearchProviderProps) {
  const [obj, setObj] = useState<SearchProps>();

  return (
    <SearchContext.Provider value={{obj, setObj}}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
