import { createContext, ReactNode, useContext, useState } from 'react';

interface DropdownContextType {
  type: string; // 학교 구분
  setType: (type: string) => void;
  gender: string; // 공학 구분
  setGender: (gender: string) => void;
  district: string; // 구
  setDistrict: (district: string) => void;
  neighborhood: string; // 동
  setNeighborhood: (neighborhood: string) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined,
);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string>('전체');
  const [gender, setGender] = useState<string>('전체');
  const [district, setDistrict] = useState<string>('전체');
  const [neighborhood, setNeighborhood] = useState<string>('전체');

  return (
    <DropdownContext.Provider
      value={{
        type,
        setType,
        gender,
        setGender,
        district,
        setDistrict,
        neighborhood,
        setNeighborhood,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'useDropdownContext must be used within a DropdownProvider',
    );
  }
  return context;
};
