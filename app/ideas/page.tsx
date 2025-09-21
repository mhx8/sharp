import Link from "next/link";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";
import { getAzureTableService } from "@/lib/azure-table-service";
import IdeasContent from "../components/IdeasContent";
import { IdeasSkeleton } from "../components/LoadingSkeletons";

interface IdeaFormData {
  name: string;
  idea: string;
}

async function addIdea(formData: IdeaFormData) {
  "use server";

  try {
    const tableService = getAzureTableService();

    // Validation
    if (!formData.name?.trim()) {
      throw new Error("Bitte geben Sie Ihren Namen ein");
    }

    if (!formData.idea?.trim()) {
      throw new Error("Bitte geben Sie eine Idee ein");
    }

    if (formData.idea.trim().length < 10) {
      throw new Error("Die Idee sollte mindestens 10 Zeichen lang sein");
    }

    await tableService.addIdea({
      name: formData.name.trim(),
      idea: formData.idea.trim(),
    });

    revalidatePath("/ideas");
  } catch (error) {
    console.error("Error adding idea:", error);
    throw error;
  }
}

export default function IdeasPage() {
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

        <Suspense fallback={<IdeasSkeleton />}>
          <IdeasContent addIdea={addIdea} />
        </Suspense>
      </div>
    </div>
  );
}
