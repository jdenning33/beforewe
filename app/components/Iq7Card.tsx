import { Iq7StandardProps } from "./Iq7StandardProps";

export function Iq7Card({ children, className }: Iq7StandardProps) {
  return (
    <div className={"card bg-neutral text-neutral-content " + className}>
      {children}
    </div>
  );
}

Iq7Card.Body = function Iq7CardBody({ children, className }: Iq7StandardProps) {
  return <div className={"card-body p-4 " + className}>{children}</div>;
};

Iq7Card.Title = function Iq7CardTitle({
  children,
  className,
}: Iq7StandardProps) {
  return (
    <div className={"card-title p-4 p-4 pb-0 " + className}>{children}</div>
  );
};

Iq7Card.Subsection = function Iq7CardSubsection({
  children,
  className,
}: Iq7StandardProps) {
  return (
    <div className={"border border-neutral-content rounded p-4 " + className}>
      {children}
    </div>
  );
};
