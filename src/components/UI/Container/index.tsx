import "./style.css";
function Container({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default Container;
