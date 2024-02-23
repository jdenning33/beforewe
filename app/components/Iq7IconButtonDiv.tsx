import { Iq7StandardProps } from "./Iq7StandardProps";

export function Iq7IconButtonDiv({ children, className }: Iq7StandardProps) {
  return (
    <div className={"btn btn-ghost btn-circle " + className}>{children}</div>
  );
}
