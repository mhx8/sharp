import { getAzureTableService } from "@/lib/azure-table-service";
import IdeaForm from "./IdeaForm";
import IdeaDisplay from "./IdeaDisplay";

interface IdeaData {
  id: string;
  name: string;
  idea: string;
  timestamp?: string;
}

interface IdeaFormData {
  name: string;
  idea: string;
}

async function getIdeas(): Promise<IdeaData[]> {
  try {
    const tableService = getAzureTableService();
    const ideas = await tableService.getAllIdeas();

    return ideas.map((idea) => ({
      id: idea.rowKey,
      name: idea.name,
      idea: idea.idea,
      timestamp: idea.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return [];
  }
}

interface IdeasContentProps {
  addIdea: (data: IdeaFormData) => Promise<void>;
}

export default async function IdeasContent({ addIdea }: IdeasContentProps) {
  const ideas = await getIdeas();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <IdeaForm addIdea={addIdea} />
      </div>

      {/* Ideas Display Section */}
      <div className="lg:col-span-2">
        <IdeaDisplay ideas={ideas} />
      </div>
    </div>
  );
}