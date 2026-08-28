import "@/styles/ui/li-button.css";

interface LifeInvaderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const LifeInvaderButton = (props: LifeInvaderButtonProps) => {
  const { children, onClick, type = "button" } = props;
  return (
    <button className="lifeinvader-ad-button" type={type} onClick={onClick}>
      <span className="lifeinvader-ad-button__shine" />
      <span className="lifeinvader-ad-button__content">{children}</span>
    </button>
  );
};
export default LifeInvaderButton;
