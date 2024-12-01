import { createContext, ReactNode, useContext, useState } from 'react';
import { Business } from 'src/types/business';

// Context 타입 정의
interface BusinessContextType {
  selectedBusiness: Business | null;
  setSelectedBusiness: (business: Business | null) => void;
}

// Context 기본값 설정
const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

// Context Provider 생성
export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );

  return (
    <BusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
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
