export type IconKey =
  | "shield"
  | "user"
  | "building"
  | "briefcase"
  | "clock"
  | "compass";

type CoverIconProps = {
  name: IconKey;
  className?: string;
};

const paths: Record<IconKey, string> = {
  shield: "M12 2 4 5v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V5l-8-3z",
  user: "M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",
  building: "M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6",
  briefcase: "M3 7h18v13H3zM8 7V5a4 4 0 0 1 8 0v2",
  clock: "M12 7v5l3 3",
  compass: "M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9z",
};

const extraCircle: Partial<
  Record<IconKey, { cx: number; cy: number; r: number }>
> = {
  user: { cx: 12, cy: 8, r: 4 },
  clock: { cx: 12, cy: 12, r: 9 },
};

export const CoverIcon = ({ name, className }: CoverIconProps) => {
  const circle = extraCircle[name];

  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {circle ? <circle cx={circle.cx} cy={circle.cy} r={circle.r} /> : null}
      <path d={paths[name]} />
    </svg>
  );
};
