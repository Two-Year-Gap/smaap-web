import { createContext, ReactNode, useContext, useState } from 'react';

// 타입 정의
interface NeighborhoodContextType {
  neighborhoodId: number | null;
  setNeighborhoodId: (id: number | null) => void;
}

// 기본값 설정
const NeighborhoodContext = createContext<NeighborhoodContextType | undefined>(
  undefined,
);

// Provider 생성
export const NeighborhoodProvider = ({ children }: { children: ReactNode }) => {
  const [neighborhoodId, setNeighborhoodId] = useState<number | null>(null);

  return (
    <NeighborhoodContext.Provider value={{ neighborhoodId, setNeighborhoodId }}>
      {children}
    </NeighborhoodContext.Provider>
  );
};

// Custom Hook for consuming the context
export const useNeighborhoodContext = () => {
  const context = useContext(NeighborhoodContext);
  if (!context) {
    throw new Error(
      'useNeighborhoodContext must be used within a NeighborhoodProvider',
    );
  }
  return context;
};
