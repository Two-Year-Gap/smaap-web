import { useState } from 'react';
import { School } from 'src/types/schools';

interface UseRadiusModalReturn {
  isModalOpen: boolean;
  radius: number;
  openModal: (school: School) => void;
  closeModal: () => void;
  changeRadius: (newRadius: number) => void;
}

const useRadiusModal = (): UseRadiusModalReturn => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [radius, setRadius] = useState(500); // 초기 반경

  const openModal = () => {
    setModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const changeRadius = (newRadius: number) => {
    setRadius(newRadius); // 반경 변경
  };

  return {
    isModalOpen,
    radius,
    openModal,
    closeModal,
    changeRadius,
  };
};

export default useRadiusModal;
