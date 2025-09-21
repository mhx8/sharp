"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import IdeaForm from "./IdeaForm";
import IdeaDisplay from "./IdeaDisplay";
import { IdeasSkeleton } from "./LoadingSkeletons";

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

async function fetchIdeas(): Promise<IdeaData[]> {
  const response = await fetch("/api/ideas");
  if (!response.ok) {
    throw new Error("Failed to fetch ideas");
  }
  return response.json();
}

async function addIdea(data: IdeaFormData): Promise<void> {
  const response = await fetch("/api/ideas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add idea");
  }
}

export default function IdeasContent() {
  const queryClient = useQueryClient();

  const {
    data: ideas = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ideas"],
    queryFn: fetchIdeas,
  });

  const addIdeaMutation = useMutation({
    mutationFn: addIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const handleAddIdea = async (data: IdeaFormData) => {
    try {
      await addIdeaMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error adding idea:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <IdeasSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading ideas: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <IdeaForm addIdea={handleAddIdea} />
      </div>

      {/* Ideas Display Section */}
      <div className="lg:col-span-2">
        <IdeaDisplay ideas={ideas} />
      </div>
    </div>
  );
}
