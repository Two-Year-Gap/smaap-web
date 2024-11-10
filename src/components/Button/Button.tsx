import './Button.css';

interface BtnProps {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: BtnProps) => {
  return (
    <button className="btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
