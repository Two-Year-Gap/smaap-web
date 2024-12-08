import { createContext, ReactNode, useContext, useState } from 'react';

export type AnalysisItem =
  | '점포수'
  | '매출액'
  | '유동인구'
  | '거주인구'
  | '안전비상벨'
  | '안전지킴이집'
  | 'CCTV';

// 타입 정의
interface AnalysisContextType {
  selectedAnalysisItem: AnalysisItem | null;
  setSelectedAnalysisItem: (item: AnalysisItem | null) => void;
}

// 기본값 설정
const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined,
);

// Provider 생성
export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAnalysisItem, setSelectedAnalysisItem] =
    useState<AnalysisItem | null>(null);

  return (
    <AnalysisContext.Provider
      value={{ selectedAnalysisItem, setSelectedAnalysisItem }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

// Custom Hook for consuming the context
export const useAnalysisContext = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error(
      'useAnalysisContext must be used within an AnalysisProvider',
    );
  }
  return context;
};
