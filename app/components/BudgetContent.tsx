"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BudgetForm from "./BudgetForm";
import BudgetDiagram from "./BudgetDiagram";
import { BudgetSkeleton } from "./LoadingSkeletons";

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

async function fetchBudgets(): Promise<BudgetData[]> {
  const response = await fetch("/api/budget");
  if (!response.ok) {
    throw new Error("Failed to fetch budgets");
  }
  return response.json();
}

async function addBudget(data: BudgetFormData): Promise<void> {
  const response = await fetch("/api/budget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add budget");
  }
}

export default function BudgetContent() {
  const queryClient = useQueryClient();

  const {
    data: budgets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: fetchBudgets,
  });

  const addBudgetMutation = useMutation({
    mutationFn: addBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });

  const handleAddBudget = async (data: BudgetFormData) => {
    try {
      await addBudgetMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error adding budget:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <BudgetSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading budgets: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <BudgetForm onSubmit={handleAddBudget} />
      </div>

      {/* Diagram Section */}
      <div className="lg:col-span-2">
        <BudgetDiagram budgets={budgets} />
      </div>
    </div>
  );
}
