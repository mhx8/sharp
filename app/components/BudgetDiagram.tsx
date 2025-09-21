interface BudgetData {
  preferredBudget: number;
  name?: string;
}

interface BudgetDiagramProps {
  budgets: BudgetData[];
}

export default function BudgetDiagram({ budgets }: BudgetDiagramProps) {
  if (budgets.length === 0) {
    return (
      <div className="card w-full bg-base-200 shadow-xl">
        <div className="card-body text-center">
          <h3 className="card-title justify-center">📊 Budget Übersicht</h3>
          <p className="opacity-70">
            Fügen Sie Budgets hinzu, um die Visualisierung zu sehen
          </p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalPreferred = budgets.reduce((sum, b) => sum + b.preferredBudget, 0);
  const avgPreferred = totalPreferred / budgets.length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">📊 Budget Übersicht</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="stat">
              <div className="stat-title">Teilnehmer insgesamt</div>
              <div className="stat-value text-primary">{budgets.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Durchschnittliches Budget</div>
              <div className="stat-value text-secondary">
                CHF {avgPreferred.toFixed(0)}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Gesamtbudget</div>
              <div className="stat-value text-accent">
                CHF {totalPreferred.toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
