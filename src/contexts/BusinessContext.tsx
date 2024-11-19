import { createContext, ReactNode, useContext, useState } from 'react';

// Context 타입 정의
interface BusinessContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

// Context 기본값 설정
const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

// Context Provider 생성
export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  return (
    <BusinessContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </BusinessContext.Provider>
  );
};

// Custom Hook for consuming the context
export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error(
      'useBusinessContext must be used within a BusinessProvider',
    );
  }
  return context;
};
