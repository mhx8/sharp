import { NextRequest, NextResponse } from "next/server";
import { getAzureTableService } from "@/lib/azure-table-service";

export async function GET() {
  try {
    const tableService = getAzureTableService();
    const budgets = await tableService.getAllBudgets();

    const formattedBudgets = budgets.map((budget) => ({
      id: budget.rowKey,
      name: budget.name,
      preferredBudget: budget.preferredBudget,
      timestamp: budget.timestamp,
    }));

    return NextResponse.json(formattedBudgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { preferredBudget, name } = body;

    // Validation
    if (!preferredBudget || preferredBudget <= 0) {
      return NextResponse.json(
        { error: "Bitte geben Sie ein gültiges Budget ein" },
        { status: 400 },
      );
    }

    const tableService = getAzureTableService();
    await tableService.addBudget({
      name: name || undefined,
      preferredBudget: preferredBudget,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding budget:", error);
    return NextResponse.json(
      { error: "Failed to add budget" },
      { status: 500 },
    );
  }
}
