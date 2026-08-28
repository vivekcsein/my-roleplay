const PanelSkeleton = () => {
  return (
    <div className="li-skeleton" aria-hidden="true">
      <div className="li-skeleton__bar li-skeleton__bar--title" />
      <div className="li-skeleton__row">
        <div className="li-skeleton__bar" />
        <div className="li-skeleton__bar" />
      </div>
      <div className="li-skeleton__bar" />
      <div className="li-skeleton__bar li-skeleton__bar--short" />
      <div className="li-skeleton__bar li-skeleton__bar--block" />
    </div>
  );
};

export default PanelSkeleton;
