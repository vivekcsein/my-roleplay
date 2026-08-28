import Link from "next/link";
import "@/styles/ui/li-link.css";

interface LifeInvaderLinkProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}

const LifeInvaderLink = ({
  children,
  className = "",
  href,
  ...props
}: LifeInvaderLinkProps) => {
  return (
    <Link
      className={`lifeinvader-link ${className}`}
      href={href ?? "/"}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LifeInvaderLink;
