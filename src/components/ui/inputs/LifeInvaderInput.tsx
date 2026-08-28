import "@/styles/ui/li-input.css";

const LifeInvaderInput = ({ className = "", ...props }) => {
  return <input className={`lifeinvader-input ${className}`} {...props} />;
};

export default LifeInvaderInput;
