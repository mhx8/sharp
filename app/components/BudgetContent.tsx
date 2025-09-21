import { getAzureTableService } from "@/lib/azure-table-service";
import BudgetForm from "./BudgetForm";
import BudgetDiagram from "./BudgetDiagram";

interface BudgetData {
  id: string;
  preferredBudget: number;
  name?: string;
  timestamp?: string;
}

interface BudgetFormData {
  preferredBudget: number;
  name?: string;
}

async function getBudgets(): Promise<BudgetData[]> {
  try {
    const tableService = getAzureTableService();
    const budgets = await tableService.getAllBudgets();

    return budgets.map((budget) => ({
      id: budget.rowKey,
      name: budget.name,
      preferredBudget: budget.preferredBudget,
      timestamp: budget.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return [];
  }
}

interface BudgetContentProps {
  addBudget: (data: BudgetFormData) => Promise<void>;
}

export default async function BudgetContent({ addBudget }: BudgetContentProps) {
  const budgets = await getBudgets();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <BudgetForm onSubmit={addBudget} />
      </div>

      {/* Diagram Section */}
      <div className="lg:col-span-2">
        <BudgetDiagram budgets={budgets} />
      </div>
    </div>
  );
}