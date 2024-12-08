import { createContext, ReactNode, useContext, useState } from 'react';
import { School } from 'src/types/schools';

// 타입 정의
interface SchoolContextType {
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
}

// 기본값 설정
const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

// Provider 생성
export const SchoolProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  return (
    <SchoolContext.Provider value={{ selectedSchool, setSelectedSchool }}>
      {children}
    </SchoolContext.Provider>
  );
};

// Custom Hook for consuming the context
export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchoolContext must be used within a SchoolProvider');
  }
  return context;
};
