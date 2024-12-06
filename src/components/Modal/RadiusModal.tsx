import { School } from 'src/types/schools';
import './RadiusModal.css';

interface RadiusModalProps {
  school: School;
  radius: number;
  onClose: () => void;
  onRadiusChange: (newRadius: number) => void;
}

const RadiusModal = ({
  school,
  radius,
  onClose,
  onRadiusChange,
}: RadiusModalProps) => {
  // 모달 바깥 영역 클릭 핸들러
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // 바깥 클릭 시 모달 닫기
    }
  };

  const getShortAddress = (address: string) => {
    const parts = address.split(' '); // 공백을 기준으로 나눔
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1]} ${parts[2]}`; // 첫 3개의 단어만 반환
    }
    return address; // 공백이 두 번 미만이면 원본 주소 반환
  };

  const shortAddress = getShortAddress(school.lotNumberAddress);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h3>{school.name}</h3>
        <p>{`주소: ${shortAddress}`}</p>
        <p>반경: {radius}m</p>
        <div className="radius-controls">
          <button onClick={() => onRadiusChange(300)}>300m</button>
          <button onClick={() => onRadiusChange(500)}>500m</button>
          <button onClick={() => onRadiusChange(1000)}>1km</button>
        </div>
        <button className="close-modal" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default RadiusModal;
