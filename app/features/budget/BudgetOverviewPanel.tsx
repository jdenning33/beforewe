import { Iq7Card } from "../../components/Iq7Card";

export function BudgetOverviewPanel({ className }: { className?: string }) {
  return (
    <div className="flex gap-2">
      <Iq7Card.Subsection className="flex-auto">
        <div className="font-medium">Available Funds</div>
        <p>$1000</p>
      </Iq7Card.Subsection>
      <Iq7Card.Subsection className="flex-auto flex gap-4">
        <div>
          <div className="font-medium">Expected Cost</div>
          <p>$1000</p>
        </div>
        <div>
          <div className="font-medium">Remaining Balance</div>
          <p>$1000</p>
        </div>
      </Iq7Card.Subsection>
    </div>
  );
}
