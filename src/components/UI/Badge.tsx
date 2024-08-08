function Badge({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <div className="relative w-fit hover:scale-95 cursor-pointer transition-all">
      {children}
      {name != "0" && (
        <div className="bg-primary center w-4 h-4 text-xs font-bold rounded-full absolute -top-2 -right-2">
          {name}
        </div>
      )}
    </div>
  );
}

export default Badge;
