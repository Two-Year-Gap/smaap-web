import { createContext, ReactNode, useContext, useState } from 'react';

// 타입 정의
interface SchoolContextType {
  selectedSchool: {
    name: string | null;
    latitude: number | null;
    longitude: number | null;
  };
  setSelectedSchool: (school: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}

// 기본값 설정
const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

// Provider 생성
export const SchoolProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSchool, setSelectedSchool] = useState<{
    name: string | null;
    latitude: number | null;
    longitude: number | null;
  }>({
    name: null,
    latitude: null,
    longitude: null,
  });

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
