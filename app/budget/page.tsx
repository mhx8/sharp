import Link from "next/link";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";
import { getAzureTableService } from "@/lib/azure-table-service";
import BudgetContent from "../components/BudgetContent";
import { BudgetSkeleton } from "../components/LoadingSkeletons";

interface BudgetFormData {
  preferredBudget: number;
  name?: string;
}

async function addBudget(formData: BudgetFormData) {
  "use server";
  
  try {
    const tableService = getAzureTableService();
    
    // Validation
    if (!formData.preferredBudget || formData.preferredBudget <= 0) {
      throw new Error("Bitte geben Sie ein gültiges Budget ein");
    }
    
    await tableService.addBudget({
      name: formData.name || undefined,
      preferredBudget: formData.preferredBudget,
    });
    
    revalidatePath("/budget");
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error;
  }
}

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-[url('/bg-image.avif')] bg-cover bg-center bg-no-repeat relative p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">

          <div className="flex gap-2 mt-4 sm:mt-0">
            <Link href="/" className="btn btn-ghost">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>

        <Suspense fallback={<BudgetSkeleton />}>
          <BudgetContent addBudget={addBudget} />
        </Suspense>
      </div>
    </div>
  );
}
