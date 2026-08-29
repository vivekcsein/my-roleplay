import { Button, Link } from "@/components/ui";
import { useCtaLink } from "@/packages/hooks/useCtaLink";

interface HeroCtaProps {
  cta: { text: string; href: string };
  className?: string;
}

const HeroCta = ({ cta, className }: HeroCtaProps) => {
  const { isExternal } = useCtaLink(cta.href);

  if (isExternal) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <Button>{cta.text}</Button>
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.text}
    </Link>
  );
};

export default HeroCta;
