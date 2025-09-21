import { NextRequest, NextResponse } from "next/server";
import { getAzureTableService } from "@/lib/azure-table-service";

export async function GET() {
  try {
    const tableService = getAzureTableService();
    const ideas = await tableService.getAllIdeas();

    const formattedIdeas = ideas.map((idea) => ({
      id: idea.rowKey,
      name: idea.name,
      idea: idea.idea,
      timestamp: idea.timestamp,
    }));

    return NextResponse.json(formattedIdeas);
  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      { error: "Failed to fetch ideas" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, idea } = body;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Bitte geben Sie Ihren Namen ein" },
        { status: 400 },
      );
    }

    if (!idea?.trim()) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine Idee ein" },
        { status: 400 },
      );
    }

    if (idea.trim().length < 10) {
      return NextResponse.json(
        { error: "Die Idee sollte mindestens 10 Zeichen lang sein" },
        { status: 400 },
      );
    }

    const tableService = getAzureTableService();
    await tableService.addIdea({
      name: name.trim(),
      idea: idea.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding idea:", error);
    return NextResponse.json({ error: "Failed to add idea" }, { status: 500 });
  }
}
