function ToolTip({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip: string;
}) {
  return (
    <div className="tooltip" data-tip={tip}>
      {children}
    </div>
  );
}

export default ToolTip;
