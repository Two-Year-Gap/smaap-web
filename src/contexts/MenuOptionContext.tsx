import React, { createContext, useContext, useState } from 'react';

// MenuOption 타입 정의
export type MenuOption = '학교 선택' | '업종 선택' | '분석 개요';

// Context 데이터 타입 정의
interface MenuOptionContextType {
  selectedOption: MenuOption;
  setSelectedOption: (option: MenuOption) => void;
}

// Context 생성
const MenuOptionContext = createContext<MenuOptionContextType | undefined>(
  undefined,
);

// Provider 생성
export const MenuOptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedOption, setSelectedOption] = useState<MenuOption>('학교 선택');

  return (
    <MenuOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </MenuOptionContext.Provider>
  );
};

// Custom Hook for consuming the context
export const useMenuOptionContext = () => {
  const context = useContext(MenuOptionContext);
  if (!context) {
    throw new Error('useMenuOption must be used within a MenuOptionProvider');
  }
  return context;
};
